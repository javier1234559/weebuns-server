import { ApiProperty } from '@nestjs/swagger';

import { QuizQuestion } from 'src/models/quiz-question/entities/quiz-question.entity';
import { Space } from 'src/models/space/entities/space.entity';
import { User } from 'src/models/user/entities/user.entity';

export class UpdateQuizResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_space: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ type: () => Space, required: false })
  space?: Space;

  @ApiProperty({ type: () => User, required: false })
  creator?: User;

  @ApiProperty({ type: () => [QuizQuestion], required: false })
  questions?: QuizQuestion[];
}
