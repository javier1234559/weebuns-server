
import {EssayStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateEssayDto {
  title?: string;
summary?: string;
content?: string;
cover_url?: string;
@ApiProperty({ enum: EssayStatus})
status?: EssayStatus;
language?: string;
}
