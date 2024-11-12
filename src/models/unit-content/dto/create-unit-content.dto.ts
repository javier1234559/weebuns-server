import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

export class CreateUnitContentDto {
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  contentType: string;
  @ApiProperty({
    type: () => Object,
  })
  content: Prisma.InputJsonValue;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  orderIndex: number;
}
