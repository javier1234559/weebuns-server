import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitContentProgressDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  completedAt?: Date | null;
}
