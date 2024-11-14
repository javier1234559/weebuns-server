import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  LanguageCode,
  LevelCode,
  TargetCode,
  TopicCode,
} from 'src/common/enum/common';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: LanguageCode,
    example: LanguageCode.ENGLISH,
  })
  @IsEnum(LanguageCode)
  language: string;

  @ApiProperty({
    enum: TargetCode,
    example: TargetCode.COMMUNICATION,
  })
  @IsEnum(TargetCode)
  target: string;

  @ApiProperty({
    enum: LevelCode,
    example: LevelCode.INTERMEDIATE,
    description: 'Current proficiency level',
  })
  @IsEnum(LevelCode)
  currentLevel: string;

  @ApiProperty({
    enum: TopicCode,
    example: TopicCode.BUSINESS,
    description: 'Main learning topic',
  })
  @IsEnum(TopicCode)
  topic: string;

  @ApiProperty({
    enum: LevelCode,
    example: LevelCode.ADVANCED,
    description: 'Target proficiency level to achieve',
  })
  @IsEnum(LevelCode)
  targetLevel: string;
}
