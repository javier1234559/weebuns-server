import { ApiProperty } from '@nestjs/swagger';

export class ConnectCorrectionDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
