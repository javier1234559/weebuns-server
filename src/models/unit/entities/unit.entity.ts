import { ApiProperty } from '@nestjs/swagger';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { Course } from 'src/models/course/entities/course.entity';
import { Note } from 'src/models/note/entities/note.entity';
import { UnitComment } from 'src/models/unit-comment/entities/unit-comment.entity';
import { UnitContent } from 'src/models/unit-content/entities/unit-content.entity';
import { IUnit } from 'src/models/unit/unit.interface';

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
    type: 'boolean',
  })
  isPremium: boolean;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  unitWeight: number;
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
    type: () => UnitComment,
    isArray: true,
    required: false,
  })
  comments?: UnitComment[];
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
