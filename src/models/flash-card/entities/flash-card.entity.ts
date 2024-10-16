import { User } from '../../user/entities/user.entity';
import { Vocabulary } from '../../vocabulary/entities/vocabulary.entity';

export class FlashCard {
  id: number;
  id_vocabulary: number;
  id_user: number;
  familiarity_level: number;
  review_date: Date;
  user?: User;
  vocabulary?: Vocabulary;
}
