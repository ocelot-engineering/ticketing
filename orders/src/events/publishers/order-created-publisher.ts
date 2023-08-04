import { Publisher, OrderCreatedEvent, Subjects } from '@wizard4571/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject: OrderCreatedEvent['subject'] = Subjects.OrderCreated;
}
