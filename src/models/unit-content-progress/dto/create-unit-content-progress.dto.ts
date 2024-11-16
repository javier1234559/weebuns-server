import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitContentProgressDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  completedAt?: Date | null;
}
