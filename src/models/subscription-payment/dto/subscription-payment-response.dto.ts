import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';

import { SubscriptionPayment } from '../entities/subscription-payment.entity';

export class SubscriptionPaymentResponse {
  @ApiPropertyOptional()
  @ApiProperty({ type: [SubscriptionPayment] })
  data: SubscriptionPayment[];

  @ApiProperty()
  pagination: PaginationOutputDto;
}
