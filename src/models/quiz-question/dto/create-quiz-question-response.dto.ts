import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Quiz } from 'src/models/quiz/entities/quiz.entity';

@ObjectType()
export class CreateQuizQuestionResponseDto {
  @Field()
  @ApiProperty({
    description: 'The unique identifier of the quiz question',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Field()
  @ApiProperty({
    description: 'The ID of the associated quiz',
    example: '456e7890-e89b-12d3-a456-426614174001',
  })
  quiz_id: string;

  @Field()
  @ApiProperty({
    description: 'The text of the quiz question',
    example: 'What is the capital of France?',
  })
  question_text: string;

  @Field()
  @ApiProperty({
    description: 'The correct answer to the quiz question',
    example: 'Paris',
  })
  correct_answer: string;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'The answer provided by the user, if any',
    required: false,
  })
  user_answer: string | null;

  @Field()
  @ApiProperty({
    description: 'Indicates if the user answer is correct',
    example: true,
  })
  is_correct: boolean;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'The ID of an associated vocabulary item, if relevant',
    required: false,
  })
  id_vocabulary: string | null;

  @Field()
  @ApiProperty({
    description: 'The date and time when the quiz question was created',
    example: '2024-11-04T10:23:54.000Z',
  })
  created_at: Date;

  @Field()
  @ApiProperty({
    description: 'The date and time when the quiz question was last updated',
    example: '2024-11-04T10:23:54.000Z',
  })
  updated_at: Date;

  @Field({ nullable: true })
  @ApiProperty({
    type: () => Quiz,
    description: 'The associated quiz object, if relevant',
    required: false,
  })
  quiz?: Quiz;
}
