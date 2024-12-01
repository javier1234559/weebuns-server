import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';
export declare class Vocabulary {
    id: string;
    spaceId: string;
    term: string;
    meaning: string[];
    exampleSentence: string | null;
    imageUrl: string | null;
    referenceLink: string | null;
    referenceName: string | null;
    tags: string[];
    repetitionLevel: number;
    nextReview: Date | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    space?: Space;
    creator?: User;
}
