import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { Course } from '../../../models/course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

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
    type: 'integer',
    format: 'int32',
  })
  completedWeight: number;
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
    nullable: true,
  })
  purchasePrice: Prisma.Decimal | null;
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
