import { Correction } from '../../correction/entities/correction.entity';
import { User } from '../../user/entities/user.entity';
export declare class CorrectionReply {
    id: string;
    correctionId: string;
    comment: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    correction?: Correction;
    creator?: User;
}
