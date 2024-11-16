import { registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaymentType, SubscriptionType } from '@prisma/client';

import { SubscriptionPayment } from 'src/models/subscription-payment/entities/subscription-payment.entity';

import { User } from '../../user/entities/user.entity';

registerEnumType(PaymentType, {
  name: 'PaymentType',
  description: 'PaymentType providers',
});

registerEnumType(SubscriptionType, {
  name: 'SubscriptionType',
  description: 'SubscriptionType supported',
});

export class Subscription {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    enum: SubscriptionType,
  })
  type: SubscriptionType;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  startDate: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  endDate: Date | null;
  @ApiProperty({
    type: 'string',
  })
  status: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  correctionBalance: number;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
  @ApiProperty({
    type: () => SubscriptionPayment,
    isArray: true,
    required: false,
  })
  payments?: SubscriptionPayment[];
}
