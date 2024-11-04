import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType()
export class UpdateSpaceResponseDto {
  @Field()
  @ApiProperty({
    description: 'The unique identifier of the updated space',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @Field()
  @ApiProperty({
    description: 'The updated name of the space',
    example: 'Advanced English Learning Group',
    minLength: 1,
    maxLength: 100,
  })
  name: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'The updated description of the space',
    example:
      'A group aimed at advanced English learners with essays, quizzes, and vocabulary challenges',
    nullable: true,
  })
  description?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'The updated number of essays in the space',
    example: 15,
    minimum: 0,
    nullable: true,
  })
  essay_number?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'The updated number of quizzes in the space',
    example: 8,
    minimum: 0,
    nullable: true,
  })
  quiz_number?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: 'The updated number of vocabulary items in the space',
    example: 75,
    minimum: 0,
    nullable: true,
  })
  vocab_number?: number;
}
