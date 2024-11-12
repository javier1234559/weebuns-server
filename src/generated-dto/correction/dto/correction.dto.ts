import { ApiProperty } from '@nestjs/swagger';

export class CorrectionDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
