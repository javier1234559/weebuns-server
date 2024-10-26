import { IQuizQuestion } from 'src/models/quiz-question/quiz-question.interface';

export class QuizQuestion implements IQuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  correct_answer: string;
  user_answer: string;
  is_correct: boolean;
  id_vocabulary: string;
  created_at: Date;
  updated_at: Date;
}
