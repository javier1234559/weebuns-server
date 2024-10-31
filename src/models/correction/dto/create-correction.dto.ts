import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ExistEntity } from 'src/common/decorators/exist-entity.decorator';

import { CreateCorrectionSentenceDto } from '../../correction-sentence/dto/create-correction-sentence.dto';

@InputType()
export class CreateCorrectionDto {
  @ExistEntity('essay')
  @Field()
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  essay_id: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 'Overall comment', nullable: true })
  @IsString()
  @IsOptional()
  overall_comment?: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 4, nullable: true })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @Field(() => [CreateCorrectionSentenceDto])
  @ApiProperty({ type: [CreateCorrectionSentenceDto] })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateCorrectionSentenceDto)
  sentences: CreateCorrectionSentenceDto[];
}
