import { ApiProperty } from '@nestjs/swagger';

export class UpdateLessonCommentDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  content?: string;
}
