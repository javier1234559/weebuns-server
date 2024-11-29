import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonCommentDto {
  @ApiProperty({
    type: 'string',
  })
  content: string;
}
