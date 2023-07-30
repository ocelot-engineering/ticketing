import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
    BadRequestError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@wizard4571/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post(
    '/api/orders',
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('TicketId must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { ticketId } = req.body;

        // Find the ticket the user is trying to order in the db
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError();
        }

        // Make sure that the this ticket is not already reserved
        const existingOrder = await Order.findOne({
            ticket: ticket,
            status: {
                $in: [
                    OrderStatus.Created,
                    OrderStatus.AwaitingPayment,
                    OrderStatus.Complete,
                ],
            },
        });
        if (existingOrder) {
            throw new BadRequestError('Ticket is already reservered');
        }
        // Caclualte the expiration date for this order

        // Build the order and save it to the db

        // Publish an event saying that an order is created
        res.send({});
    }
);

export { router as newOrderRouter };
