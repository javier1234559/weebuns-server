import { IQuiz } from 'src/models/quiz/quiz.interface';
import { Space } from 'src/models/space/entities/space.entity';

import { QuizQuestion } from '../../quiz-question/entities/quiz-question.entity';
import { User } from '../../user/entities/user.entity';

export class Quiz implements IQuiz {
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
