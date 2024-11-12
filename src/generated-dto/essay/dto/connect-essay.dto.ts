import { ApiProperty } from '@nestjs/swagger';

export class ConnectEssayDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
