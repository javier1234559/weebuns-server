import { ApiProperty } from '@nestjs/swagger';

import { Course } from 'src/models/course/entities/course.entity';
import { Lesson } from 'src/models/lesson/entities/lesson.entity';
import { INote } from 'src/models/note/note.interface';
import { Unit } from 'src/models/unit/entities/unit.entity';

import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class Note implements INote {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  spaceId: string | null;
  @ApiProperty({
    type: 'string',
  })
  lessonId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  courseId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  unitId: string | null;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  tags: string[];
  @ApiProperty({
    type: 'boolean',
  })
  isBookmarked: boolean;
  @ApiProperty({
    type: 'string',
  })
  createdBy: string;
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
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deletedAt: Date | null;
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
  @ApiProperty({
    type: () => Space,
    required: false,
    nullable: true,
  })
  space?: Space | null;
  @ApiProperty({
    type: () => Course,
    required: false,
    nullable: true,
  })
  Course?: Course | null;
  @ApiProperty({
    type: () => Unit,
    required: false,
    nullable: true,
  })
  Unit?: Unit | null;
}
