import { ContentStatus } from '@prisma/client';
import { Correction } from '../../correction/entities/correction.entity';
import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';
export declare class Essay {
    id: string;
    spaceId: string;
    title: string;
    upvoteCount: number;
    summary: string | null;
    content: string;
    coverUrl: string | null;
    status: ContentStatus;
    language: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    space?: Space;
    author?: User;
    hashtags?: EssayHashtag[];
    corrections?: Correction[];
}
