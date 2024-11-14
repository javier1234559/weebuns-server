import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

export class UserCourseDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
}
