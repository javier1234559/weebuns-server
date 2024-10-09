
import {User} from '../../user/entities/user.entity'
import {FlashCard} from '../../flash-card/entities/flash-card.entity'


export class Vocabulary {
  id: number ;
created_by: number ;
image: string  | null;
word: string ;
definition: string ;
pronunciation: string ;
example: string ;
part_of_speech: string ;
mastery_level: string ;
is_need_review: boolean ;
next_review_date: Date  | null;
ease_factor: number ;
interval: number ;
created_at: Date ;
updated_at: Date ;
user?: User ;
flash_cards?: FlashCard[] ;
}
