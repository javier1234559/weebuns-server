import { ApiProperty } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';

import { Correction } from '../../correction/entities/correction.entity';
import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class Essay {
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
  title: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  upvoteCount: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  summary: string | null;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  coverUrl: string | null;
  @ApiProperty({
    enum: EssayStatus,
  })
  status: EssayStatus;
  @ApiProperty({
    type: 'string',
  })
  language: string;
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
    type: () => Space,
    required: false,
  })
  space?: Space;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  author?: User;
  @ApiProperty({
    type: () => EssayHashtag,
    isArray: true,
    required: false,
  })
  hashtags?: EssayHashtag[];
  @ApiProperty({
    type: () => Correction,
    isArray: true,
    required: false,
  })
  corrections?: Correction[];
}
