import { SubscriptionType } from '@prisma/client';
export declare class CreateSubscriptionDto {
    type: SubscriptionType;
    startDate: Date;
    endDate?: Date | null;
    status: string;
}
