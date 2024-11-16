import { ApiProperty } from '@nestjs/swagger';

import { PaymentType, Prisma } from '@prisma/client';

export class UpdateSubscriptionPaymentDto {
  @ApiProperty({
    type: 'number',
    format: 'double',
    required: false,
  })
  amount?: Prisma.Decimal;
  @ApiProperty({
    enum: PaymentType,
    required: false,
  })
  paymentType?: PaymentType;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  paymentDate?: Date;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  status?: string;
}
