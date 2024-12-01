import { ContentStatus } from '@prisma/client';
export declare class EssayDto {
    id: string;
    title: string;
    upvoteCount: number;
    summary: string | null;
    content: string;
    coverUrl: string | null;
    status: ContentStatus;
    language: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
