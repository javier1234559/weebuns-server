import { ApiProperty } from '@nestjs/swagger';

import { PaymentType } from '@prisma/client';
import { IsDate, IsDecimal, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateSubscriptionPaymentDto {
  @ApiProperty({
    type: String,
    description: 'UUID of subscription',
  })
  @IsUUID()
  subscriptionId: string;

  @ApiProperty({
    type: Number,
    description: 'Payment amount',
    format: 'decimal',
  })
  @IsDecimal()
  amount: number;

  @ApiProperty({
    enum: PaymentType,
    description: 'Type of payment',
  })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({
    type: Date,
    description: 'Date of payment',
  })
  @IsDate()
  paymentDate: Date;

  @ApiProperty({
    type: String,
    description: 'Payment status',
  })
  @IsString()
  status: string;
}
