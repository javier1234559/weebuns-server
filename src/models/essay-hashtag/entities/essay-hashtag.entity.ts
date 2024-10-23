import { Essay } from '../../essay/entities/essay.entity';
import { Hashtag } from '../../hashtag/entities/hashtag.entity';

export class EssayHashtag {
  id: number;
  essay_id: number;
  hashtag_id: number;
  created_at: Date;
  essay?: Essay;
  hashtag?: Hashtag;
}
