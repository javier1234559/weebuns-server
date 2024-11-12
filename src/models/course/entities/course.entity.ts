import { ApiProperty } from '@nestjs/swagger';

import { Prisma, ProficiencyLevel } from '@prisma/client';

import { SpaceCourse } from 'src/models/space-course/entities/space-course.entity';

import { Unit } from '../../unit/entities/unit.entity';
import { UserCourse } from '../../user-course/entities/user-course.entity';
import { User } from '../../user/entities/user.entity';

export class Course {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  currentUnitId: string | null;
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
    enum: ProficiencyLevel,
  })
  level: ProficiencyLevel;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  price: Prisma.Decimal;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  totalWeight: number;
  @ApiProperty({
    type: 'boolean',
  })
  isPublished: boolean;
  @ApiProperty({
    example: '[{',
    type: () => Object,
  })
  reviews: Prisma.JsonValue;
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
    nullable: true,
  })
  currentUnit?: Unit | null;
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
    type: () => UserCourse,
    isArray: true,
    required: false,
  })
  userCourses?: UserCourse[];
  @ApiProperty({
    type: () => SpaceCourse,
    isArray: true,
    required: false,
  })
  spaces?: SpaceCourse[];
}
