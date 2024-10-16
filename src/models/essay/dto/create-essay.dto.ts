import { ApiProperty } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';

export class CreateEssayDto {
  title: string;
  summary?: string;
  content?: string;
  thumbnail?: string;
  @ApiProperty({ enum: EssayStatus })
  status: EssayStatus;
}
