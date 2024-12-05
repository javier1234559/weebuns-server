import { PartialType } from '@nestjs/swagger';

import { CreateSubscriptionPaymentDto } from './create-subscription-payment.dto';

export class UpdateSubscriptionPaymentDto extends PartialType(
  CreateSubscriptionPaymentDto,
) {}
