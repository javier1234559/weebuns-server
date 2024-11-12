import { ApiProperty } from '@nestjs/swagger';

import { Correction } from '../../correction/entities/correction.entity';

export class CorrectionSentence {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  correctionId: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  index: number;
  @ApiProperty({
    type: 'string',
  })
  originalText: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  correctedText: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  explanation: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  isCorrect: boolean;
  @ApiProperty({
    type: 'number',
    format: 'float',
    nullable: true,
  })
  rating: number | null;
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
}
