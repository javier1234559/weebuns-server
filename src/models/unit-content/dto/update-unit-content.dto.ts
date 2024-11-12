import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

export class UpdateUnitContentDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  title?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  contentType?: string;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  content?: Prisma.InputJsonValue;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  orderIndex?: number;
}
