import { ApiProperty } from '@nestjs/swagger';

export class ConnectCorrectionReplyDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
