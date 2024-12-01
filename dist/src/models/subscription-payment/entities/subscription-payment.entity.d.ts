import { PaymentType, Prisma } from '@prisma/client';
import { Subscription } from '../../subscription/entities/subscription.entity';
export declare class SubscriptionPayment {
    id: string;
    subscriptionId: string;
    amount: Prisma.Decimal;
    paymentType: PaymentType;
    paymentDate: Date;
    status: string;
    subscription?: Subscription;
}
