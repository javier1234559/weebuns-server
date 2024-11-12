import { ApiProperty } from '@nestjs/swagger';

import { Unit } from '../../unit/entities/unit.entity';
import { User } from '../../user/entities/user.entity';

export class UnitComment {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  unitId: string;
  @ApiProperty({
    type: 'string',
  })
  createdBy: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: () => Unit,
    required: false,
  })
  unit?: Unit;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  creator?: User;
}
