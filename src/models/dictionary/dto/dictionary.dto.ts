import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class SearchSentenceQueryDto {
  @ApiProperty()
  @IsString()
  query: string;
}

export class SentenceFieldsDto {
  @ApiProperty()
  en: string;

  @ApiProperty()
  vi: string;

  @ApiProperty({ required: false })
  @IsOptional()
  tag?: string[];
}

export class SentenceResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  fields: SentenceFieldsDto;
}

export class SearchSentenceResponseDto {
  @ApiProperty()
  language: string;

  @ApiProperty({ type: [SentenceResponseDto] })
  sentences: SentenceResponseDto[];

  @ApiProperty({ type: [String] })
  suggestions: string[];

  @ApiProperty({ type: [String] })
  tratu: string[];
}
