import { QuizQuestion } from '../../quiz-question/entities/quiz-question.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class Quiz {
  id: number;
  id_space: number;
  title: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  space?: Space;
  creator?: User;
  questions?: QuizQuestion[];
}
