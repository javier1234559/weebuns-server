import { ApiProperty } from '@nestjs/swagger';

import { EssayHashtag } from '../../essay-hashtag/entities/essay-hashtag.entity';

export class Hashtag {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  usageCount: number;
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
    type: () => EssayHashtag,
    isArray: true,
    required: false,
  })
  essays?: EssayHashtag[];
}
