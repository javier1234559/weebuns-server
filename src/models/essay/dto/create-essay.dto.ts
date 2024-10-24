import { ApiProperty } from '@nestjs/swagger';

import { EssayStatus } from '@prisma/client';

export class CreateEssayDto {
  title: string;
  summary?: string;
  content: string;
  cover_url?: string;
  @ApiProperty({ enum: EssayStatus })
  status: EssayStatus;
  language: string;

  spaceId: string;
  created_by: string;
}
