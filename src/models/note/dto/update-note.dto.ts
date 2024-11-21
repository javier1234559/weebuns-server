import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateNoteDto } from 'src/models/note/dto/create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty({ required: false })
  isBookmarked?: boolean;
}
