import { Space } from 'src/models/space/entities/space.entity';
import { User } from 'src/models/user/entities/user.entity';
import { IVocabulary } from 'src/models/vocabulary/vocabulary.interface';
export declare class Vocabulary implements IVocabulary {
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
    deletedAt: Date;
    space?: Space;
    creator?: User;
}
