import { ApiProperty } from '@nestjs/swagger';

export class ConnectUnitContentDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
