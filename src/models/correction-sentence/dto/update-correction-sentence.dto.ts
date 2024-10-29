import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class UpdateCorrectionSentenceDto {
  @Field()
  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(0)
  index: number;

  @Field()
  @ApiProperty({ example: 'Original text' })
  @IsString()
  original_text: string;

  @Field()
  @ApiProperty({ example: 'Corrected text' })
  @IsString()
  corrected_text: string;

  @Field()
  @ApiProperty({ example: 'Explanation of the correction' })
  @IsString()
  explanation: string;

  @Field()
  @ApiProperty({ example: false })
  is_correct: boolean;

  @Field()
  @ApiProperty({ example: 4.5 })
  @IsNumber()
  rating: number;
}
