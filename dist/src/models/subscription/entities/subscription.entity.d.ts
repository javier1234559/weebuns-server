import { SubscriptionType } from '@prisma/client';
import { SubscriptionPayment } from 'src/models/subscription-payment/entities/subscription-payment.entity';
import { User } from '../../user/entities/user.entity';
export declare class Subscription {
    id: string;
    userId: string;
    type: SubscriptionType;
    startDate: Date;
    endDate: Date | null;
    status: string;
    correctionBalance: number;
    user?: User;
    payments?: SubscriptionPayment[];
}
