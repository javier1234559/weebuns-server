import { ApiProperty } from '@nestjs/swagger';

export class ConnectSubscriptionPaymentDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
