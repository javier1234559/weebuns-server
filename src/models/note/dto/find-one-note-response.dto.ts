import { ApiProperty } from '@nestjs/swagger';

import { Note } from 'src/models/note/entities/note.entity';

export class FindOneNoteResponseDto {
  @ApiProperty({
    type: Note,
    nullable: true,
  })
  note: Note | null;
}
