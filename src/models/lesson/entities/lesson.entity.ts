import { ApiProperty } from '@nestjs/swagger';

import { ContentStatus, Prisma } from '@prisma/client';

import { ILesson } from 'src/models/lesson/lesson.interface';

import { CourseProgress } from '../../course-progress/entities/course-progress.entity';
import { LessonComment } from '../../lesson-comment/entities/lesson-comment.entity';
import { Note } from '../../note/entities/note.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';

export class Lesson implements ILesson {
  @ApiProperty({
    type: 'number',
    default: 0,
  })
  lessonWeight: number;

  @ApiProperty({
    type: 'string',
    default: () => 'uuid()',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  unitId: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  summary: string | null;
  @ApiProperty({
    type: () => Object,
  })
  content: Prisma.JsonValue;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  orderIndex: number;
  @ApiProperty({
    type: 'boolean',
  })
  isPremium: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  isRequired: boolean;
  @ApiProperty({
    enum: ContentStatus,
  })
  status: ContentStatus;
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
    type: () => Unit,
    required: false,
  })
  unit?: Unit;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
  @ApiProperty({
    type: () => Note,
    isArray: true,
    required: false,
  })
  notes?: Note[];
  @ApiProperty({
    type: () => LessonComment,
    isArray: true,
    required: false,
  })
  comments?: LessonComment[];
  @ApiProperty({
    type: () => CourseProgress,
    isArray: true,
    required: false,
  })
  currentInProgress?: CourseProgress[];
  @ApiProperty({
    type: () => CourseProgress,
    isArray: true,
    required: false,
  })
  nextInProgress?: CourseProgress[];
}
