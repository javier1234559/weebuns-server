import { ApiProperty } from '@nestjs/swagger';

import { Lesson } from 'src/models/lesson/entities/lesson.entity';
import { User } from 'src/models/user/entities/user.entity';

export class LessonComment {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  lessonId: string;
  @ApiProperty({
    type: 'string',
  })
  createdBy: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: () => Lesson,
    required: false,
  })
  lesson?: Lesson;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
}
