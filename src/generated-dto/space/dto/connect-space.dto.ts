import { ApiProperty } from '@nestjs/swagger';

export class ConnectSpaceDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
