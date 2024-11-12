import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  title?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  content?: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  deletedAt?: Date | null;
}
