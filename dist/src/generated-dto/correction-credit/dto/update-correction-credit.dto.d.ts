import { PaymentType, Prisma } from '@prisma/client';
export declare class UpdateCorrectionCreditDto {
    amount?: number;
    price?: Prisma.Decimal;
    paymentId?: string | null;
    paymentType?: PaymentType;
    expireDate?: Date | null;
}
