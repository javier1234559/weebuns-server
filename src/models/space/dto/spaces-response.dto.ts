import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { Space } from 'src/models/space/entities/space.entity';

@ObjectType()
export class SpacesResponse {
  @Field(() => [Space])
  @ApiProperty({ type: [Space] })
  data: Space[];

  @Field(() => PaginationOutputDto)
  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}
