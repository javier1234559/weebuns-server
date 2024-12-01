import { CorrectionReply } from '../../correction-reply/entities/correction-reply.entity';
import { CorrectionSentence } from '../../correction-sentence/entities/correction-sentence.entity';
import { Essay } from '../../essay/entities/essay.entity';
import { User } from '../../user/entities/user.entity';
export declare class Correction {
    id: string;
    essayId: string;
    overallComment: string | null;
    rating: number | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    essay?: Essay;
    creator?: User;
    sentences?: CorrectionSentence[];
    replies?: CorrectionReply[];
}
