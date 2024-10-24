





export class CreateQuizQuestionDto {
  question_text: string;
correct_answer: string;
user_answer?: string;
is_correct: boolean;
id_vocabulary?: string;
}
