
import {User} from '../../user/entities/user.entity'
import {Space} from '../../space/entities/space.entity'
import {FlashCard} from '../../flash-card/entities/flash-card.entity'


export class Vocabulary {
  id: string ;
image_url: string  | null;
word: string ;
part_of_speech: string  | null;
definition: string  | null;
pronunciation: string  | null;
example: string  | null;
reference_link: string  | null;
id_essay_link: string  | null;
id_space: string  | null;
mastery_level: string  | null;
is_need_review: boolean  | null;
next_review_date: string  | null;
ease_factor: number  | null;
interval: number  | null;
created_by: string ;
created_at: Date ;
updated_at: Date ;
creator?: User ;
space?: Space  | null;
flash_cards?: FlashCard[] ;
}
