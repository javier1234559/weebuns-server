import { ApiProperty } from '@nestjs/swagger';

import { Prisma, ProficiencyLevel } from '@prisma/client';

export class CreateCourseDto {
  @ApiProperty({
    type: 'string',
  })
  title: string;
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
  })
  level: ProficiencyLevel;
  @ApiProperty({
    type: 'number',
    format: 'double',
    required: false,
    nullable: true,
  })
  price?: Prisma.Decimal | null;
}
