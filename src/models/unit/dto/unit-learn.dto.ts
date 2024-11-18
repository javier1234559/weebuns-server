import { ApiProperty } from '@nestjs/swagger';

import { Unit } from '../entities/unit.entity';

export class UnitLearnResponseDto {
  @ApiProperty({ type: Unit })
  unit: Unit;
}
