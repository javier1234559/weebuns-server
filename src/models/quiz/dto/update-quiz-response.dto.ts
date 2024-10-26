import { ApiProperty } from '@nestjs/swagger';

import { QuizQuestion } from 'src/models/quiz-question/entities/quiz-question.entity';
import { Space } from 'src/models/space/entities/space.entity';
import { User } from 'src/models/user/entities/user.entity';

export class UpdateQuizResponseDto {
  @ApiProperty({
    description: 'Quiz ID',
    example: 1,
  })
  id: string;

  @ApiProperty({
    description: 'Space ID that quiz belongs to',
    example: 1,
  })
  id_space: string;

  @ApiProperty({
    description: 'Quiz title',
    example: 'JavaScript Fundamentals Quiz',
  })
  title: string;

  @ApiProperty({
    description: 'ID of user who created the quiz',
    example: 1,
  })
  created_by: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-10-25T10:30:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-10-25T10:30:00Z',
  })
  updated_at: Date;

  @ApiProperty({
    type: () => Space,
    required: false,
    description: 'Space details that quiz belongs to',
  })
  space?: Space;

  @ApiProperty({
    type: () => User,
    required: false,
    description: 'Creator details',
  })
  creator?: User;

  @ApiProperty({
    type: () => [QuizQuestion],
    required: false,
    description: 'List of questions in the quiz',
    isArray: true,
  })
  questions?: QuizQuestion[];
}
