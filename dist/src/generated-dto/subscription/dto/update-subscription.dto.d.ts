import { SubscriptionType } from '@prisma/client';
export declare class UpdateSubscriptionDto {
    type?: SubscriptionType;
    startDate?: Date;
    endDate?: Date | null;
    status?: string;
}
