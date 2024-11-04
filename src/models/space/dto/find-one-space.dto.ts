import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

@InputType()
export class FindOneSpaceDto {
  @ExistEntity('space')
  @ApiProperty({
    description: 'ID of space',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @Field()
  @IsString()
  id: string;
}
