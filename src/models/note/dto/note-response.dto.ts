import { ApiProperty } from '@nestjs/swagger';

export class NoteResponseDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string' })
  content: string;

  @ApiProperty({ type: 'string', isArray: true })
  tags: string[];

  @ApiProperty({ type: 'boolean' })
  isBookmarked: boolean;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}

export class CreateUpdateNoteResponseDto {
  @ApiProperty({ type: 'string' })
  status: string;

  @ApiProperty({ type: NoteResponseDto })
  note: NoteResponseDto;
}
