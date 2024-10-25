import { ApiProperty } from '@nestjs/swagger';

import { Quiz } from 'src/models/quiz/entities/quiz.entity';

export class CreateQuizQuestionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quiz_id: number;

  @ApiProperty()
  question_text: string;

  @ApiProperty()
  correct_answer: string;

  @ApiProperty({ required: false })
  user_answer: string | null;

  @ApiProperty()
  is_correct: boolean;

  @ApiProperty({ required: false })
  id_vocabulary: number | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ type: () => Quiz, required: false })
  quiz?: Quiz;
}
