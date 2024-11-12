import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitCommentDto {
  @ApiProperty({
    type: 'string',
  })
  content: string;
}
