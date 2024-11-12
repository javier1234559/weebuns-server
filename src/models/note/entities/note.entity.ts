import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { Unit } from '../../../models/unit/entities/unit.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class Note {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  spaceId: string | null;
  @ApiProperty({
    type: 'string',
  })
  unitId: string;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    example: ['grammar', 'important', 'review', 'vocabulary'],
    type: () => Object,
  })
  tags: Prisma.JsonValue;
  @ApiProperty({
    type: 'boolean',
  })
  isBookmarked: boolean;
  @ApiProperty({
    type: 'string',
  })
  createdBy: string;
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
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deletedAt: Date | null;
  @ApiProperty({
    type: () => Unit,
    required: false,
  })
  unit?: Unit;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
  @ApiProperty({
    type: () => Space,
    required: false,
    nullable: true,
  })
  space?: Space | null;
}
