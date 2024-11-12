import { ApiProperty } from '@nestjs/swagger';

import { Language, SpaceTarget } from '@prisma/client';

export class UpdateSpaceDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  name?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    enum: SpaceTarget,
    required: false,
  })
  target?: SpaceTarget;
  @ApiProperty({
    enum: Language,
    required: false,
  })
  language?: Language;
}
