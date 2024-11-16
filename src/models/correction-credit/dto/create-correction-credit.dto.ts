import { ApiProperty } from '@nestjs/swagger';

import { PaymentType, Prisma } from '@prisma/client';

export class CreateCorrectionCreditDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  amount: number;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  price: Prisma.Decimal;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  paymentId?: string | null;
  @ApiProperty({
    enum: PaymentType,
  })
  paymentType: PaymentType;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  expireDate?: Date | null;
}
