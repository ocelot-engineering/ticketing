import { Publisher, Subjects, TicketUpdatedEvent } from '@wizard4571/common';

export class TickerUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: TicketUpdatedEvent['subject'] = Subjects.TicketUpdated;
}
