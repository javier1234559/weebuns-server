import { ApiProperty } from '@nestjs/swagger';

export class CreateCorrectionSentenceDto {
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
    required: false,
    nullable: true,
  })
  correctedText?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  explanation?: string | null;
  @ApiProperty({
    type: 'number',
    format: 'float',
    required: false,
    nullable: true,
  })
  rating?: number | null;
}
