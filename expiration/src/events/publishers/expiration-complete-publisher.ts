import {
    Subjects,
    Publisher,
    ExpirationCompleteEvent,
} from '@wizard4571/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: ExpirationCompleteEvent['subject'] = Subjects.ExpirationComplete;
}
