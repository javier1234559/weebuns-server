import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class CreateSpaceResponseDto {
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
}
