import { SubscriptionType } from '@prisma/client';
export declare class SubscriptionDto {
    id: string;
    type: SubscriptionType;
    startDate: Date;
    endDate: Date | null;
    status: string;
    correctionBalance: number;
}
