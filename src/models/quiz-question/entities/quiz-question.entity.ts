import { IQuizQuestion } from 'src/models/quiz-question/quiz-question.interface';

import { Quiz } from '../../quiz/entities/quiz.entity';

export class QuizQuestion implements IQuizQuestion {
  id: number;
  quiz_id: number;
  question_text: string;
  correct_answer: string;
  user_answer: string | null;
  is_correct: boolean;
  id_vocabulary: number | null;
  created_at: Date;
  updated_at: Date;
  quiz?: Quiz;
}
