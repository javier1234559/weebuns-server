import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { $Enums, Language, SpaceTarget } from '@prisma/client';

import { ISpace } from 'src/models/space/space.interface';
import { User } from 'src/models/user/entities/user.entity';

registerEnumType(SpaceTarget, {
  name: 'SpaceTarget',
});

registerEnumType(Language, {
  name: 'Language',
});

@ObjectType()
class SpaceCount {
  @Field(() => Int)
  @ApiProperty({ example: 0 })
  essays: number;

  @Field(() => Int)
  @ApiProperty({ example: 0 })
  notes: number;

  @Field(() => Int)
  @ApiProperty({ example: 0 })
  vocabularies: number;
}

@ObjectType()
export class Space implements ISpace {
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: string;

  @Field()
  @ApiProperty({ example: 'English Learning Space' })
  name: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'A space for learning English', nullable: true })
  description: string | null;

  @Field(() => User)
  @ApiProperty({ example: 1 })
  createdBy: string;

  @Field(() => Date)
  @ApiProperty()
  createdAt: Date;

  @Field(() => Date)
  @ApiProperty()
  updatedAt: Date;

  @Field(() => $Enums.SpaceTarget)
  @ApiProperty()
  target: $Enums.SpaceTarget;

  @Field(() => $Enums.Language)
  @ApiProperty()
  language: $Enums.Language;

  @Field(() => SpaceCount, { nullable: true })
  @ApiProperty({
    type: 'object',
    properties: {
      essays: { type: 'number', example: 0 },
      notes: { type: 'number', example: 0 },
      vocabularies: { type: 'number', example: 0 },
    },
    example: {
      essays: 0,
      notes: 0,
      vocabularies: 0,
    },
  })
  _count?: SpaceCount;
}
