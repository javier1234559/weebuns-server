import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Space } from 'src/models/space/entities/space.entity';

@ObjectType()
export class SpaceResponse {
  @Field(() => Space)
  @ApiProperty()
  data: Space;
}
