import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@wizard4571/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: OrderCreatedEvent['subject'] = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // find the ticket the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // if no ticket, then throw error
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        // mark the ticket as being reserved by setting it's order id
        ticket.set({ orderId: data.id });

        // save the ticket
        await ticket.save();

        // acknowledge the message
        msg.ack();
    }
}
