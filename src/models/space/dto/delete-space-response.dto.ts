import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Space } from 'src/models/space/entities/space.entity';
import { User } from 'src/models/user/entities/user.entity';

@ObjectType()
export class DeleteSpaceResponseDto {
  @Field(() => Space)
  @ApiProperty({ type: Space })
  space: Space;

  @Field(() => User)
  @ApiProperty({ type: User })
  user: User;
}
