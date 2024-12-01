import { ContentStatus } from '@prisma/client';
export declare class CreateEssayDto {
    title: string;
    summary?: string;
    content: string;
    cover_url?: string;
    status: ContentStatus;
    language: string;
    spaceId: string;
    hashtag_names?: string[];
}
