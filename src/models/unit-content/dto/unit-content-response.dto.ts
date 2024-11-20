import { ApiProperty } from '@nestjs/swagger';

import { UnitContent } from 'src/models/unit-content/entities/unit-content.entity';

export class UnitContentResponseDto {
  @ApiProperty({
    type: UnitContent,
  })
  unitContent: UnitContent;
}
