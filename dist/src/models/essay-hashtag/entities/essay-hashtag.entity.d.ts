import { IEssayHashtag } from 'src/models/essay-hashtag/essay-hashtag.interface';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';
import { Essay } from '../../essay/entities/essay.entity';
export declare class EssayHashtag implements IEssayHashtag {
    id: string;
    essayId: string;
    hashtagId: string;
    createdAt: Date;
    essay?: Essay;
    hashtag?: Hashtag;
}
