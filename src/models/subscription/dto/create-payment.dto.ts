import { ApiProperty } from '@nestjs/swagger';

import { SubscriptionType } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({
    enum: SubscriptionType,
  })
  planType: SubscriptionType;

  @ApiProperty({
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  currency?: string;
}

export class CreatePaymentResponseDto {
  @ApiProperty()
  paymentUrl: string;

  @ApiProperty()
  transactionId: string;
}
