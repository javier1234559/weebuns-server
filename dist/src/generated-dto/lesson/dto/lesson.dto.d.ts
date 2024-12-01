import { ContentStatus, Prisma } from '@prisma/client';
export declare class LessonDto {
    id: string;
    title: string;
    summary: string | null;
    content: Prisma.JsonValue;
    orderIndex: number;
    isPremium: boolean;
    isRequired: boolean;
    status: ContentStatus;
    createdAt: Date;
    updatedAt: Date;
    lessonWeight: number;
}
