import { PaymentType, Prisma } from '@prisma/client';
export declare class UpdateSubscriptionPaymentDto {
    amount?: Prisma.Decimal;
    paymentType?: PaymentType;
    paymentDate?: Date;
    status?: string;
}
