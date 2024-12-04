import { ApiProperty } from '@nestjs/swagger';

import { SubscriptionType } from '@prisma/client';

export class FindSubscriptionStatusResponseDto {
  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty({ enum: SubscriptionType })
  type: SubscriptionType;

  @ApiProperty({ type: Date })
  expiresAt: Date;
}
