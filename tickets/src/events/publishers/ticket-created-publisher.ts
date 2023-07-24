import { Publisher, Subjects, TicketCreatedEvent } from '@wizard4571/common';

export class TickerCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: TicketCreatedEvent['subject'] = Subjects.TicketCreated;
}
