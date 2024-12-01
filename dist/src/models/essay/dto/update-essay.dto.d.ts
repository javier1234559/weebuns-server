import { ContentStatus } from '@prisma/client';
export declare class UpdateEssayDto {
    title?: string;
    summary?: string;
    content?: string;
    upvote_count: number;
    cover_url?: string;
    status?: ContentStatus;
    language?: string;
    hashtag_names?: string[];
}
