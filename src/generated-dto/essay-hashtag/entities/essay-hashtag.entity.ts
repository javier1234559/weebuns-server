import { ApiProperty } from '@nestjs/swagger';

import { Essay } from '../../essay/entities/essay.entity';
import { Hashtag } from '../../hashtag/entities/hashtag.entity';

export class EssayHashtag {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  essayId: string;
  @ApiProperty({
    type: 'string',
  })
  hashtagId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: () => Essay,
    required: false,
  })
  essay?: Essay;
  @ApiProperty({
    type: () => Hashtag,
    required: false,
  })
  hashtag?: Hashtag;
}
