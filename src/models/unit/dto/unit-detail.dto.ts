import { ApiProperty } from '@nestjs/swagger';

import { NoteDto } from 'src/models/note/dto/note.dto';

export class UnitDetailDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  courseId: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string', nullable: true })
  description: string | null;

  @ApiProperty({ type: 'integer', format: 'int32' })
  orderIndex: number;

  @ApiProperty({ type: NoteDto, nullable: true })
  notes: NoteDto | null;
}
