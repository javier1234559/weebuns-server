import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { User } from 'src/models/user/entities/user.entity';

import { Course } from '../../course/entities/course.entity';

export class UserCourse {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  courseId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  paymentId: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  paymentStatus: string | null;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  purchasePrice: Prisma.Decimal;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  purchasedAt: Date;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
  @ApiProperty({
    type: () => Course,
    required: false,
  })
  course?: Course;
}