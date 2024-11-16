import { ApiProperty } from '@nestjs/swagger';

import { PaymentType, Prisma } from '@prisma/client';

export class UpdateCorrectionCreditDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  amount?: number;
  @ApiProperty({
    type: 'number',
    format: 'double',
    required: false,
  })
  price?: Prisma.Decimal;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  paymentId?: string | null;
  @ApiProperty({
    enum: PaymentType,
    required: false,
  })
  paymentType?: PaymentType;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  expireDate?: Date | null;
}
