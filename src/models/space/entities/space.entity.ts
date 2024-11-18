import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import {
  LanguageCode,
  LevelCode,
  TargetCode,
  TopicCode,
} from 'src/common/enum/common';
import { ISpace } from 'src/models/space/space.interface';
import { User } from 'src/models/user/entities/user.entity';

registerEnumType(TargetCode, {
  name: 'TargetCode',
  description: 'Learning target codes',
});

registerEnumType(TopicCode, {
  name: 'TopicCode',
  description: 'Learning topic codes',
});

registerEnumType(LevelCode, {
  name: 'LevelCode',
  description: 'Proficiency level codes',
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
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Field()
  @ApiProperty({ example: 'English Learning Space' })
  name: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'A space for learning English',
    nullable: true,
  })
  description: string | null;

  @Field(() => LanguageCode)
  @ApiProperty({
    enum: LanguageCode,
    example: LanguageCode.ENGLISH,
    description: 'Learning language',
  })
  language: string;

  @Field(() => TargetCode)
  @ApiProperty({
    enum: TargetCode,
    example: TargetCode.COMMUNICATION,
    description: 'Learning target/purpose',
  })
  target: string;

  @Field(() => LevelCode)
  @ApiProperty({
    enum: LevelCode,
    example: LevelCode.INTERMEDIATE,
    description: 'Current proficiency level',
  })
  currentLevel: string;

  @Field(() => TopicCode)
  @ApiProperty({
    type: 'string',
    isArray: true,
    example: [TopicCode.ACADEMIC, TopicCode.DAILY_LIFE],
    description: 'Main learning topic',
  })
  topics: string[];

  @Field(() => LevelCode)
  @ApiProperty({
    enum: LevelCode,
    example: LevelCode.ADVANCED,
    description: 'Target proficiency level to achieve',
  })
  targetLevel: string;

  @Field(() => String)
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the user who created this space',
  })
  createdBy: string;

  @Field(() => Date)
  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @Field(() => Date)
  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @Field(() => Date)
  @ApiProperty()
  deletedAt: Date;

  @Field(() => SpaceCount, { nullable: true })
  @ApiProperty({
    type: SpaceCount,
    description: 'Count of related entities',
    example: {
      essays: 0,
      notes: 0,
      vocabularies: 0,
    },
  })
  _count?: SpaceCount;

  // Optional: Add relations if needed
  @Field(() => User, { nullable: true })
  @ApiProperty({
    type: () => User,
    description: 'Creator user details',
    nullable: true,
  })
  creator?: User;
}
