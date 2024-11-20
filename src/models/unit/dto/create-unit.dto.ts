import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
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

  @ApiProperty({
    type: 'boolean',
    required: false,
  })
  isPremium?: boolean;

  @ApiProperty({
    type: 'string',
  })
  courseId: string;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  unitWeight?: number;
}
