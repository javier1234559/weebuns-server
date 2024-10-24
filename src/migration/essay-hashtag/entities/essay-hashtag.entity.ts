
import {Essay} from '../../essay/entities/essay.entity'
import {Hashtag} from '../../hashtag/entities/hashtag.entity'


export class EssayHashtag {
  id: string ;
essay_id: string ;
hashtag_id: string ;
created_at: Date ;
essay?: Essay ;
hashtag?: Hashtag ;
}
