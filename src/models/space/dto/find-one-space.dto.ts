import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { Space } from 'src/models/space/entities/space.entity';

@InputType()
export class FindOneSpaceDto {
  @ApiProperty()
  @Field()
  @IsInt()
  id: number;
}
@ObjectType()
export class SpaceResponse {
  @Field(() => Space)
  @ApiProperty()
  data: Space;
}
