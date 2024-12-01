import { ContentStatus } from '@prisma/client';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';
import { User } from 'src/models/user/entities/user.entity';
export declare class CreateEssayResponseDto {
    id: string;
    id_space: string;
    title?: string;
    summary?: string;
    content?: string;
    upvote_count: number;
    cover_url?: string;
    status?: ContentStatus;
    language?: string;
    author?: User;
    hashtags?: {
        hashtag: Hashtag;
    }[];
}
