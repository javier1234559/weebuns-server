
import {EssayHashtag} from '../../essay-hashtag/entities/essay-hashtag.entity'


export class Hashtag {
  id: number ;
name: string ;
usage_count: number ;
created_at: Date ;
updated_at: Date ;
essays?: EssayHashtag[] ;
}
