import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { Note } from 'src/models/note/entities/note.entity';
import { UnitContent } from 'src/models/unit-content/entities/unit-content.entity';

import { Course } from '../../course/entities/course.entity';

export class Unit {
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
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  orderIndex: number;
  @ApiProperty({
    example: '[{',
    type: () => Object,
  })
  comments: Prisma.JsonValue;
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
    type: () => UnitContent,
    isArray: true,
    required: false,
  })
  contents?: UnitContent[];
  @ApiProperty({
    type: () => Note,
    isArray: true,
    required: false,
  })
  notes?: Note[];
  @ApiProperty({
    type: () => Course,
    isArray: true,
    required: false,
  })
  currentInCourses?: Course[];
}
