import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { CorrectionResponseOneDto } from 'src/models/correction/dto/correction-one-response.dto';

@ObjectType()
export class CorrectionResponseAllDto {
  @Field(() => [CorrectionResponseOneDto])
  @ApiProperty({ type: [CorrectionResponseOneDto] })
  data: CorrectionResponseOneDto[];

  @Field(() => PaginationOutputDto)
  @ApiProperty({ type: PaginationOutputDto })
  pagination?: PaginationOutputDto;
}
