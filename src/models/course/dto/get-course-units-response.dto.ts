import { ApiProperty } from '@nestjs/swagger';

import { UnitDto } from 'src/models/unit/dto/unit.dto';

export class GetCourseUnitsResponseDto {
  @ApiProperty({ type: [UnitDto] })
  data: UnitDto[];
}
