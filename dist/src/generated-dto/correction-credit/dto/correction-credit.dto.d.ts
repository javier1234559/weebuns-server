import { PaymentType, Prisma } from '@prisma/client';
export declare class CorrectionCreditDto {
    id: string;
    amount: number;
    price: Prisma.Decimal;
    paymentId: string | null;
    paymentType: PaymentType;
    expireDate: Date | null;
    createdAt: Date;
}
