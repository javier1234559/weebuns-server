import { ApiProperty } from '@nestjs/swagger';

export class ConnectSubscriptionDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
