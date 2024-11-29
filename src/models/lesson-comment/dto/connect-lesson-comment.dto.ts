import { ApiProperty } from '@nestjs/swagger';

export class ConnectLessonCommentDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}
