import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Note } from 'src/models/note/entities/note.entity';

@ObjectType()
export class NotesResponse {
  @Field(() => [Note])
  @ApiProperty({ type: [Note] })
  data: Note[];

  @Field(() => PaginationOutputDto)
  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
