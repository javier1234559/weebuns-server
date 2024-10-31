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

import { UpdateCorrectionSentenceDto } from 'src/models/correction-sentence/dto/update-correction-sentence.dto';

@InputType()
export class UpdateCorrectionDto {
  @Field()
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 'Overall comment', nullable: true })
  @IsString()
  @IsOptional()
  overall_comment?: string;

  @Field({ nullable: true })
  @ApiProperty({ example: 4.5, nullable: true })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @Field(() => [UpdateCorrectionSentenceDto])
  @ApiProperty({ type: [UpdateCorrectionSentenceDto] })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  @Type(() => UpdateCorrectionSentenceDto)
  sentences?: UpdateCorrectionSentenceDto[];
}
