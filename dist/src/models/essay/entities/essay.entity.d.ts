import { ContentStatus } from '@prisma/client';
import { Correction } from 'src/models/correction/entities/correction.entity';
import { EssayHashtag } from 'src/models/essay-hashtag/entities/essay-hashtag.entity';
import { IEssay } from 'src/models/essay/essay.interface';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';
export declare class Essay implements IEssay {
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
    corrections?: Correction[];
    hashtags?: EssayHashtag[];
}
