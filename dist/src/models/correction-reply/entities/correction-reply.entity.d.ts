import { User } from '../../user/entities/user.entity';
import { ICorrectionReply } from '../correction-reply.interface';
export declare class CorrectionReply implements ICorrectionReply {
    id: string;
    correctionId: string;
    comment: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    creator?: User;
}
