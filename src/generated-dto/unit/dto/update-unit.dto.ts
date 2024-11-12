import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  title?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  orderIndex?: number;
}
