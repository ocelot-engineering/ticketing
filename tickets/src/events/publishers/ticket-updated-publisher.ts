import { Publisher, Subjects, TicketUpdatedEvent } from '@wizard4571/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: TicketUpdatedEvent['subject'] = Subjects.TicketUpdated;
}
