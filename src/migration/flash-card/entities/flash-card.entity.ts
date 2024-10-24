
import {Vocabulary} from '../../vocabulary/entities/vocabulary.entity'
import {User} from '../../user/entities/user.entity'


export class FlashCard {
  id: string ;
id_vocabulary: string ;
familiarity_level: number ;
review_date: Date ;
created_by: string ;
created_at: Date ;
updated_at: Date ;
vocabulary?: Vocabulary ;
creator?: User ;
}
