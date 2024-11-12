import { ApiProperty } from '@nestjs/swagger';

import { Correction } from '../../correction/entities/correction.entity';
import { User } from '../../user/entities/user.entity';

export class CorrectionReply {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  correctionId: string;
  @ApiProperty({
    type: 'string',
  })
  comment: string;
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
    type: () => Correction,
    required: false,
  })
  correction?: Correction;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
}
