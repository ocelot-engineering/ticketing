import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { OrderStatus } from '@wizard4571/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does not exist', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'placeholder',
            orderId: new mongoose.Types.ObjectId().toHexString(),
        })
        .expect(404);
});

it('returns a 401 when purchasing an order that doesnt belong to user', async () => {
    const order = await Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'placeholder',
            orderId: order.id,
        })
        .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const order = await Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'placeholder',
            orderId: order.id,
        })
        .expect(400);
});

it('returns a 204 with valid inputs', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const order = await Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'tok_visa', // test token
            orderId: order.id,
        })
        .expect(201);

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

    expect(chargeOptions.source).toEqual('tok_visa');
    expect(chargeOptions.amount).toEqual(20 * 100);
    expect(chargeOptions.currency).toEqual('gbp');

    const payment = await Payment.findOne({
        orderId: order.id,
    });
    expect(payment).not.toBeNull();
});
