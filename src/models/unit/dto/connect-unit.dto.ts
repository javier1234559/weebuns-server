import { ApiProperty } from '@nestjs/swagger';

export class ConnectUnitDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
