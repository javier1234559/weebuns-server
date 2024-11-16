import { ApiProperty } from '@nestjs/swagger';

import { PaymentType, Prisma } from '@prisma/client';

export class SubscriptionPaymentDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  amount: Prisma.Decimal;
  @ApiProperty({
    enum: PaymentType,
  })
  paymentType: PaymentType;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  paymentDate: Date;
  @ApiProperty({
    type: 'string',
  })
  status: string;
}
