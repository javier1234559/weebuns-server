import { Essay } from '../../essay/entities/essay.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { User } from '../../user/entities/user.entity';
import { Vocabulary } from '../../vocabulary/entities/vocabulary.entity';

export class Space {
  id: number;
  name: string;
  description: string | null;
  essay_number: number | null;
  quiz_number: number | null;
  vocab_number: number | null;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  creator?: User;
  essays?: Essay[];
  quizzes?: Quiz[];
  vocabularies?: Vocabulary[];
}
