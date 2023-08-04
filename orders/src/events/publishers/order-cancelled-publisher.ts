import { Publisher, OrderCancelledEvent, Subjects } from '@wizard4571/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject: OrderCancelledEvent['subject'] = Subjects.OrderCancelled;
}
