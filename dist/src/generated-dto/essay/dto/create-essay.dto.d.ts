import { ContentStatus } from '@prisma/client';
export declare class CreateEssayDto {
    title: string;
    summary?: string | null;
    content: string;
    coverUrl?: string | null;
    status: ContentStatus;
    language: string;
    deletedAt?: Date | null;
}
