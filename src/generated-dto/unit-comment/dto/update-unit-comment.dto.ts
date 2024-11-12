import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitCommentDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  content?: string;
}
