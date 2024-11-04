import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType()
export class CreateSpaceResponseDto {
  @Field()
  @ApiProperty({
    description: 'The unique identifier of the created space',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @Field()
  @ApiProperty({
    description: 'The name of the space',
    example: 'English Learning Group',
    minLength: 1,
    maxLength: 100,
  })
  name: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'A brief description of the space',
    example:
      'A group focused on improving English skills through essays and quizzes',
    nullable: true,
  })
  description?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'The number of essays in the space',
    example: 10,
    minimum: 0,
    nullable: true,
  })
  essay_number?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'The number of quizzes available in the space',
    example: 5,
    minimum: 0,
    nullable: true,
  })
  quiz_number?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'The number of vocabulary items in the space',
    example: 50,
    minimum: 0,
    nullable: true,
  })
  vocab_number?: number;
}
