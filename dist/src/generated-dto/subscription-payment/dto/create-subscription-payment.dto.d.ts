import { PaymentType, Prisma } from '@prisma/client';
export declare class CreateSubscriptionPaymentDto {
    amount: Prisma.Decimal;
    paymentType: PaymentType;
    paymentDate: Date;
    status: string;
}
