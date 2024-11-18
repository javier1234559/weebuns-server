import { ApiProperty } from '@nestjs/swagger';

import { CourseProgress } from 'src/models/course-progress/entities/course-progress.entity';
import { ICourse } from 'src/models/course/course.interface';
import { SpaceCourse } from 'src/models/space-course/entities/space-course.entity';
import { Unit } from 'src/models/unit/entities/unit.entity';
import { User } from 'src/models/user/entities/user.entity';

export class Course implements ICourse {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
    type: 'string',
    nullable: true,
  })
  thumbnailUrl: string | null;
  @ApiProperty({
    type: 'string',
  })
  language: string;
  @ApiProperty({
    type: 'string',
  })
  minLevel: string;
  @ApiProperty({
    type: 'string',
  })
  maxLevel: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  topics: string[];
  @ApiProperty({
    type: 'string',
  })
  courseType: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  totalWeight: number;
  @ApiProperty({
    type: 'boolean',
  })
  isPremium: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  isPublished: boolean;
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
    type: () => User,
    required: false,
  })
  creator?: User;
  @ApiProperty({
    type: () => Unit,
    isArray: true,
    required: false,
  })
  units?: Unit[];
  @ApiProperty({
    type: () => CourseProgress,
    isArray: true,
    required: false,
  })
  progress?: CourseProgress[];
  @ApiProperty({
    type: () => SpaceCourse,
    isArray: true,
    required: false,
  })
  spaces?: SpaceCourse[];
}
