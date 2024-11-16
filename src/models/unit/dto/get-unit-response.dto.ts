import { ApiProperty } from '@nestjs/swagger';

import { Unit } from 'src/models/unit/entities/unit.entity';

export class GetUnitResponseDto {
  @ApiProperty({ type: Unit })
  unit: Unit;
}
