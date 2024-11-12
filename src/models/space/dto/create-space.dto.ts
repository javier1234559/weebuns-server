import { ApiProperty } from '@nestjs/swagger';

import { Language, SpaceTarget } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: SpaceTarget,
    example: SpaceTarget.GENERAL_LEARNING,
  })
  @IsEnum(SpaceTarget, {
    message: 'target must be one of: ' + Object.values(SpaceTarget).join(', '),
  })
  target: SpaceTarget;

  @ApiProperty({
    enum: Language,
    example: Language.ENGLISH,
  })
  @IsEnum(Language, {
    message: 'language must be one of: ' + Object.values(Language).join(', '),
  })
  language: Language;
}
