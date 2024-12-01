import { PaymentType, Prisma } from '@prisma/client';
export declare class CreateCorrectionCreditDto {
    amount: number;
    price: Prisma.Decimal;
    paymentId?: string | null;
    paymentType: PaymentType;
    expireDate?: Date | null;
}
