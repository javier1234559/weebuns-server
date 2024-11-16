import { ApiProperty } from '@nestjs/swagger';

import { UnitContent } from 'src/models/unit-content/entities/unit-content.entity';

export class GetUnitContentResponseDto {
  @ApiProperty({
    type: UnitContent,
  })
  unitContent: UnitContent;
}
