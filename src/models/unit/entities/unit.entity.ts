import { ApiProperty } from '@nestjs/swagger';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { Course } from 'src/models/course/entities/course.entity';
import { Lesson } from 'src/models/lesson/entities/lesson.entity';
import { IUnit } from 'src/models/unit/unit.interface';
import { User } from 'src/models/user/entities/user.entity';

export class Unit implements IUnit {
  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'string',
  })
  courseId: string;

  @ApiProperty({
    type: 'string',
  })
  title: string;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  orderIndex: number;

  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  isPremium: boolean;

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
    type: () => Course,
    required: false,
  })
  course?: Course;

  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;

  @ApiProperty({
    type: () => Lesson,
    isArray: true,
    required: false,
  })
  lessons?: Lesson[];

  @ApiProperty({
    type: () => CourseProgress,
    isArray: true,
    required: false,
  })
  courseProgress?: CourseProgress[];

  @ApiProperty({
    type: () => CourseProgress,
    isArray: true,
    required: false,
  })
  nextUnits?: CourseProgress[];
}
