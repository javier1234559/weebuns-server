import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { QuizQuestion } from 'src/models/quiz-question/entities/quiz-question.entity';

@ObjectType()
export class FindOneQuizQuestionResponseDto {
  @Field(() => QuizQuestion)
  @ApiProperty({ type: QuizQuestion })
  quizQuestion: QuizQuestion;
}
