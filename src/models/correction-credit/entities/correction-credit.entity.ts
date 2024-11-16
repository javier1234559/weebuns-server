import { ApiProperty } from '@nestjs/swagger';

import { PaymentType, Prisma } from '@prisma/client';

import { User } from '../../user/entities/user.entity';

export class CorrectionCredit {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  amount: number;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  price: Prisma.Decimal;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  paymentId: string | null;
  @ApiProperty({
    enum: PaymentType,
  })
  paymentType: PaymentType;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  expireDate: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
}
