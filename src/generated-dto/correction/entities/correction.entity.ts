import { ApiProperty } from '@nestjs/swagger';

import { CorrectionReply } from '../../correction-reply/entities/correction-reply.entity';
import { CorrectionSentence } from '../../correction-sentence/entities/correction-sentence.entity';
import { Essay } from '../../essay/entities/essay.entity';
import { User } from '../../user/entities/user.entity';

export class Correction {
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
    nullable: true,
  })
  overallComment: string | null;
  @ApiProperty({
    type: 'number',
    format: 'float',
    nullable: true,
  })
  rating: number | null;
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
    type: () => Essay,
    required: false,
  })
  essay?: Essay;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
  @ApiProperty({
    type: () => CorrectionSentence,
    isArray: true,
    required: false,
  })
  sentences?: CorrectionSentence[];
  @ApiProperty({
    type: () => CorrectionReply,
    isArray: true,
    required: false,
  })
  replies?: CorrectionReply[];
}
