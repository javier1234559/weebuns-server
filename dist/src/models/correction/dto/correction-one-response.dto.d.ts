import { User } from 'src/models/user/entities/user.entity';
import { CorrectionSentence } from '../../correction-sentence/entities/correction-sentence.entity';
export declare class CorrectionResponseOneDto {
    id: string;
    essayId: string;
    createdBy: string;
    overall_comment?: string;
    rating?: number;
    createdAt: Date;
    updatedAt: Date;
    creator?: User;
    sentences?: CorrectionSentence[];
}
