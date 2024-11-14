import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { Unit } from 'src/models/unit/entities/unit.entity';
import { UserCourse } from 'src/models/user-course/entities/user-course.entity';
import { User } from 'src/models/user/entities/user.entity';

import { SpaceCourse } from '../../space-course/entities/space-course.entity';

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
    type: 'string',
  })
  level: string;
  @ApiProperty({
    type: 'number',
    format: 'double',
    nullable: true,
  })
  price: Prisma.Decimal | null;
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
