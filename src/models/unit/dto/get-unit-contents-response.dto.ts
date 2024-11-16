import { ApiProperty } from '@nestjs/swagger';

import { UnitContent } from 'src/models/unit-content/entities/unit-content.entity';

export class GetUnitContentsResponseDto {
  @ApiProperty({
    type: UnitContent,
    isArray: true,
  })
  unitContents: UnitContent[];
}
