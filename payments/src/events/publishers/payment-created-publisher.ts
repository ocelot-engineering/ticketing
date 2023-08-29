import { Subjects, Publisher, PaymentCreatedEvent } from '@wizard4571/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: PaymentCreatedEvent['subject'] = Subjects.PaymentCreated;
}
