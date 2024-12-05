import { ApiProperty } from '@nestjs/swagger';

import { SubscriptionPayment } from '../entities/subscription-payment.entity';

export class FindOneSubscriptionPaymentResponseDto {
  @ApiProperty({ type: SubscriptionPayment })
  payment: SubscriptionPayment;
}
