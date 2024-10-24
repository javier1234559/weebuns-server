
import {Quiz} from '../../quiz/entities/quiz.entity'


export class QuizQuestion {
  id: string ;
quiz_id: string ;
question_text: string ;
correct_answer: string ;
user_answer: string  | null;
is_correct: boolean ;
id_vocabulary: string  | null;
created_at: Date ;
updated_at: Date ;
quiz?: Quiz ;
}
