import { CorrectionReply } from 'src/models/correction-reply/entities/correction-reply.entity';
import { CorrectionSentence } from 'src/models/correction-sentence/entities/correction-sentence.entity';
import { ICorrection } from 'src/models/correction/correction.interface';
import { Essay } from 'src/models/essay/entities/essay.entity';
import { User } from '../../user/entities/user.entity';
export declare class Correction implements ICorrection {
    id: string;
    essayId: string;
    overallComment: string | null;
    rating: number | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    essay?: Essay;
    creator?: User;
    sentences?: CorrectionSentence[];
    replies?: CorrectionReply[];
}
