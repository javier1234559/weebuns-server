
import {EssayStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateEssayDto {
  title: string;
summary?: string;
content?: string;
thumbnail?: string;
@ApiProperty({ enum: EssayStatus})
status: EssayStatus;
}