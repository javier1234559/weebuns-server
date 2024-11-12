import { ApiProperty } from '@nestjs/swagger';

export class CreateCorrectionReplyDto {
  @ApiProperty({
    type: 'string',
  })
  comment: string;
}
