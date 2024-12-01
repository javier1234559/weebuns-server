import { ISpace } from 'src/models/space/space.interface';
import { User } from 'src/models/user/entities/user.entity';
declare class SpaceCount {
    essays: number;
    notes: number;
    vocabularies: number;
}
export declare class Space implements ISpace {
    id: string;
    name: string;
    description: string | null;
    language: string;
    target: string;
    currentLevel: string;
    topics: string[];
    targetLevel: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    _count?: SpaceCount;
    creator?: User;
}
export {};
