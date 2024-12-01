import { PaymentType, Prisma } from '@prisma/client';
import { User } from '../../user/entities/user.entity';
export declare class CorrectionCredit {
    id: string;
    userId: string;
    amount: number;
    price: Prisma.Decimal;
    paymentId: string | null;
    paymentType: PaymentType;
    expireDate: Date | null;
    createdAt: Date;
    user?: User;
}
