import { ContentStatus, Prisma } from '@prisma/client';
export declare class LessonDto {
    id: string;
    unitId: string;
    title: string;
    summary: string | null;
    content: Prisma.JsonValue;
    orderIndex: number;
    isPremium: boolean;
    isRequired: boolean;
    status: ContentStatus;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    unit?: any;
    creator?: any;
    notes?: any[];
    comments?: any[];
    currentInProgress?: any[];
    nextInProgress?: any[];
}
