import { Prisma } from '@prisma/client';
export declare class UpdateLessonDto {
    title?: string;
    summary?: string | null;
    content?: Prisma.InputJsonValue;
    orderIndex?: number;
}
