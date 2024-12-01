import { Prisma } from '@prisma/client';
export declare class CreateLessonDto {
    title: string;
    summary?: string | null;
    content: Prisma.InputJsonValue;
    orderIndex: number;
}
