import { Essay } from '../../essay/entities/essay.entity';
import { Hashtag } from '../../hashtag/entities/hashtag.entity';
export declare class EssayHashtag {
    id: string;
    essayId: string;
    hashtagId: string;
    createdAt: Date;
    essay?: Essay;
    hashtag?: Hashtag;
}
