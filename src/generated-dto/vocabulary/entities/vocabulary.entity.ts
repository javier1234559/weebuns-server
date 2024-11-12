import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class Vocabulary {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  spaceId: string;
  @ApiProperty({
    type: 'string',
  })
  term: string;
  @ApiProperty({
    type: 'string',
  })
  meaning: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  exampleSentence: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  imageUrl: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  referenceLink: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  referenceName: string | null;
  @ApiProperty({
    type: () => Object,
  })
  tags: Prisma.JsonValue;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  repetitionLevel: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  nextReview: Date | null;
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
    type: () => Space,
    required: false,
  })
  space?: Space;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
}
