import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPaymentStatusDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}

export class CheckPaymentStatusResponseDto {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: String })
  status: string;

  @ApiProperty({ type: String, nullable: true })
  message?: string;
}
