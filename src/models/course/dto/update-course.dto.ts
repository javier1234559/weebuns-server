import { ApiProperty } from '@nestjs/swagger';

import { Prisma, ProficiencyLevel } from '@prisma/client';

export class UpdateCourseDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  title?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  thumbnailUrl?: string | null;
  @ApiProperty({
    enum: ProficiencyLevel,
    required: false,
  })
  level?: ProficiencyLevel;
  @ApiProperty({
    type: 'number',
    format: 'double',
    required: false,
  })
  price?: Prisma.Decimal;
}
