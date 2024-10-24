
import {EssayHashtag} from '../../essay-hashtag/entities/essay-hashtag.entity'


export class Hashtag {
  id: string ;
name: string ;
usage_count: number ;
created_at: Date ;
updated_at: Date ;
essays?: EssayHashtag[] ;
}
