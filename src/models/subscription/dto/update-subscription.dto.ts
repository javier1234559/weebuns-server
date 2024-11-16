import { ApiProperty } from '@nestjs/swagger';

import { SubscriptionType } from '@prisma/client';

export class UpdateSubscriptionDto {
  @ApiProperty({
    enum: SubscriptionType,
    required: false,
  })
  type?: SubscriptionType;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  startDate?: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  endDate?: Date | null;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  status?: string;
}
