import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Quiz } from 'src/models/quiz/entities/quiz.entity';

@ObjectType()
export class UpdateQuizQuestionResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the quiz question',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID of the quiz that this question belongs to',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  quiz_id: string;

  @ApiProperty({
    description: 'The text of the quiz question',
    example: 'What is the capital of France?',
  })
  question_text: string;

  @ApiProperty({
    description: 'The correct answer for the quiz question',
    example: 'Paris',
  })
  correct_answer: string;

  @ApiProperty({
    description: "User's answer to the question, if provided",
    required: false,
    example: 'Lyon',
  })
  user_answer: string | null;

  @ApiProperty({
    description: "Indicates if the user's answer is correct",
    example: true,
  })
  is_correct: boolean;

  @ApiProperty({
    description: 'ID of the associated vocabulary item, if applicable',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  id_vocabulary: string | null;

  @ApiProperty({
    description: 'Timestamp of when the question was created',
    example: '2024-11-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp of when the question was last updated',
    example: '2024-11-03T12:00:00Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'The quiz object associated with this question',
    required: false,
    type: () => Quiz,
  })
  quiz?: Quiz;
}
