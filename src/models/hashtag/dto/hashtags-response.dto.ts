import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Hashtag } from 'src/models/hashtag/entities/hashtag.entity';

@ObjectType()
export class HashtagsResponseDto {
  @Field(() => [Hashtag])
  @ApiProperty({ type: [Hashtag] })
  data: Hashtag[];

  @Field(() => PaginationOutputDto)
  @ApiProperty({ type: PaginationOutputDto })
  pagination?: PaginationOutputDto;
}
