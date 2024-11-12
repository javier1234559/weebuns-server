import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

export class CreateUserCourseDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  paymentId?: string | null;
  @ApiProperty({
    type: 'string',
    default: 'pending',
    required: false,
    nullable: true,
  })
  paymentStatus?: string | null;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  purchasePrice: Prisma.Decimal;
}
