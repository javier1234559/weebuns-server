import { ApiProperty } from '@nestjs/swagger';

export class ConnectCorrectionSentenceDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
