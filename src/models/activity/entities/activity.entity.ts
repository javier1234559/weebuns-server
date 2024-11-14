import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/entities/user.entity';

export class Activity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  date: Date;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  level: number;
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
    type: () => User,
    required: false,
  })
  user?: User;
}
