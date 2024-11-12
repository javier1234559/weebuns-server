import { ApiProperty } from '@nestjs/swagger';

import { Language, SpaceTarget } from '@prisma/client';

export class SpaceDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    enum: SpaceTarget,
  })
  target: SpaceTarget;
  @ApiProperty({
    enum: Language,
  })
  language: Language;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
