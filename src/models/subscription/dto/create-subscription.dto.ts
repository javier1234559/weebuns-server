import { ApiProperty } from '@nestjs/swagger';

import { SubscriptionType } from '@prisma/client';

export class CreateSubscriptionDto {
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
    required: false,
    nullable: true,
  })
  endDate?: Date | null;
  @ApiProperty({
    type: 'string',
  })
  status: string;
}
