import { ApiProperty } from '@nestjs/swagger';

export class ConnectActivityDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
