
import {Vocabulary} from '../../vocabulary/entities/vocabulary.entity'
import {User} from '../../user/entities/user.entity'


export class FlashCard {
  id: number ;
id_vocabulary: number ;
familiarity_level: number ;
review_date: Date ;
created_by: number ;
created_at: Date ;
updated_at: Date ;
vocabulary?: Vocabulary ;
creator?: User ;
}
