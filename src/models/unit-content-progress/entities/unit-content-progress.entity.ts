import { ApiProperty } from '@nestjs/swagger';

import { UnitProgress } from '../../../models/unit-progress/entities/unit-progress.entity';
import { UnitContent } from '../../unit-content/entities/unit-content.entity';

export class UnitContentProgress {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  unitProgressId: string;
  @ApiProperty({
    type: 'string',
  })
  unitContentId: string;
  @ApiProperty({
    type: 'boolean',
  })
  isCompleted: boolean;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  completedAt: Date | null;
  @ApiProperty({
    type: () => UnitProgress,
    required: false,
  })
  unitProgress?: UnitProgress;
  @ApiProperty({
    type: () => UnitContent,
    required: false,
  })
  unitContent?: UnitContent;
}
