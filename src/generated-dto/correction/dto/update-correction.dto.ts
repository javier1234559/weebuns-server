import { ApiProperty } from '@nestjs/swagger';

export class UpdateCorrectionDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  overallComment?: string | null;
  @ApiProperty({
    type: 'number',
    format: 'float',
    required: false,
    nullable: true,
  })
  rating?: number | null;
}