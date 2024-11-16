import { ApiProperty } from '@nestjs/swagger';

import { UnitDetailDto } from 'src/models/unit/dto/unit-detail.dto';

export class GetUnitResponseDto {
  @ApiProperty({ type: UnitDetailDto })
  unit: UnitDetailDto;
}
