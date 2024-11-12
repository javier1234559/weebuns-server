import { ApiProperty } from '@nestjs/swagger';

export class UpdateCorrectionReplyDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  comment?: string;
}
