import { PaymentType, Prisma } from '@prisma/client';
export declare class SubscriptionPaymentDto {
    id: string;
    amount: Prisma.Decimal;
    paymentType: PaymentType;
    paymentDate: Date;
    status: string;
}
