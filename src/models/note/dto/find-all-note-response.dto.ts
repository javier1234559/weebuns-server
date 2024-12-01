import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { SimplifiedNoteDto } from 'src/models/note/dto/simple-note.dto';

@ObjectType()
export class NotesResponse {
  @Field(() => [SimplifiedNoteDto])
  @ApiProperty({ type: [SimplifiedNoteDto] })
  data: SimplifiedNoteDto[];

  @Field(() => PaginationOutputDto)
  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
