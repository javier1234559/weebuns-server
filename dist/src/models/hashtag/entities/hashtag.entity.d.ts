import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';
import { IHashtag } from '../hashtag.interface';
export declare class HashtagCount {
    essays: number;
}
export declare class Hashtag implements IHashtag {
    id: string;
    name: string;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
    essays?: EssayHashtag[];
    _count?: HashtagCount;
}
