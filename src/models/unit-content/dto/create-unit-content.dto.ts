import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateUnitContentDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  contentType: string;
  @ApiProperty({
    type: () => Object,
  })
  @IsObject()
  content: Prisma.InputJsonValue;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNumber()
  orderIndex: number;

  @ApiProperty({
    type: 'boolean',
  })
  @IsBoolean()
  isPremium: boolean;

  @ApiProperty({
    type: 'boolean',
  })
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNumber()
  completeWeight: number;
}
