import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

@InputType()
export class FindOneQuizDto {
  @ExistEntity('quiz')
  @ApiProperty({
    description: 'ID of quiz',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @Field()
  @IsInt()
  id: number;
}
