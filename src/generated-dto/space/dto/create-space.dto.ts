import { ApiProperty } from '@nestjs/swagger';

import { Language, SpaceTarget } from '@prisma/client';

export class CreateSpaceDto {
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    enum: SpaceTarget,
  })
  target: SpaceTarget;
  @ApiProperty({
    enum: Language,
  })
  language: Language;
}
