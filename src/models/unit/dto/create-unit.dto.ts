import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  orderIndex: number;
}
