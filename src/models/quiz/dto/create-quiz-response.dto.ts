// src/models/quiz/dtos/create-quiz-response.dto.ts
import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { QuizQuestion } from 'src/models/quiz-question/entities/quiz-question.entity';
import { Space } from 'src/models/space/entities/space.entity';
import { User } from 'src/models/user/entities/user.entity';

@ObjectType()
export class CreateQuizResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the quiz',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the space to which the quiz belongs',
    example: '123e4567-e89b-12d3-a456-426614174001',
    format: 'uuid',
  })
  id_space: string;

  @ApiProperty({
    description: 'The title of the quiz',
    example: 'English Grammar Basics',
    minLength: 1,
    maxLength: 200,
  })
  title: string;

  @ApiProperty({
    description: 'ID of the user who created the quiz',
    example: '123e4567-e89b-12d3-a456-426614174002',
    format: 'uuid',
  })
  created_by: string;

  @ApiProperty({
    description: 'The date and time when the quiz was created',
    example: '2024-11-04T10:23:54.000Z',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date and time when the quiz was last updated',
    example: '2024-11-04T11:45:21.000Z',
    type: Date,
  })
  updated_at: Date;

  @ApiProperty({
    description: 'The space details related to this quiz',
    type: () => Space,
    required: false,
    nullable: true,
  })
  space?: Space;

  @ApiProperty({
    description: 'Details of the user who created the quiz',
    type: () => User,
    required: false,
    nullable: true,
  })
  creator?: User;

  @ApiProperty({
    description: 'An array of questions associated with the quiz',
    type: () => [QuizQuestion],
    required: false,
    nullable: true,
  })
  questions?: QuizQuestion[];
}
