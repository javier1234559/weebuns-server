import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Essay } from 'src/models/essay/entities/essay.entity';

@ObjectType()
export class DeleteEssayResponseDto {
  @Field(() => Essay)
  @ApiProperty({ type: Essay })
  essay: Essay;
}
