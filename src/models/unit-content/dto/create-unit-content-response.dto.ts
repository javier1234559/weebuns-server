import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

export class CreateUnitContentResponseDto {
  @ApiProperty({ type: 'string' })
  id: string;

  @ApiProperty({ type: 'string' })
  unitId: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string' })
  contentType: string;

  @ApiProperty({ type: () => Object })
  content: Prisma.InputJsonValue;

  @ApiProperty({ type: 'integer', format: 'int32' })
  orderIndex: number;

  @ApiProperty({ type: 'boolean' })
  isPremium: boolean;

  @ApiProperty({ type: 'boolean' })
  isRequired: boolean;

  @ApiProperty({ type: 'integer', format: 'int32' })
  completeWeight: number;

  @ApiProperty({ type: 'boolean' })
  isDone: boolean;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}