import { ContentStatus, Prisma } from '@prisma/client';
export declare class CreateLessonDto {
    title: string;
    summary?: string | null;
    content: Prisma.InputJsonValue;
    orderIndex: number;
    isPremium?: boolean;
    isRequired?: boolean;
    lessonWeight?: number;
    status?: ContentStatus;
}
