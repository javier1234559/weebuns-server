import { ApiProperty } from '@nestjs/swagger';

import { PaymentType, Prisma } from '@prisma/client';

export class CorrectionCreditDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
}
