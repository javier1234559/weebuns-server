import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';
export declare class Hashtag {
    id: string;
    name: string;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
    essays?: EssayHashtag[];
}
