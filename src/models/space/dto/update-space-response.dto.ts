import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/models/user/entities/user.entity';

@ObjectType()
export class UpdateSpaceResponseDto {
  @Field()
  @ApiProperty()
  id: string;

  @Field()
  @ApiProperty()
  name: string;

  @Field({ nullable: true })
  @ApiProperty()
  description?: string;

  @Field({ nullable: true })
  @ApiProperty()
  essay_number?: number;

  @Field({ nullable: true })
  @ApiProperty()
  quiz_number?: number;

  @Field({ nullable: true })
  @ApiProperty()
  vocab_number?: number;

  @Field(() => User)
  @ApiProperty({ type: () => User })
  user: User;
}
