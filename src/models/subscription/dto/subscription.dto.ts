import { ApiProperty } from '@nestjs/swagger';

import { SubscriptionType } from '@prisma/client';

export class SubscriptionDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
}
