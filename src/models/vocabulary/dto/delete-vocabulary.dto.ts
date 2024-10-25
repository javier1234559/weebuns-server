import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

export class DeleteVocabularyDto {
  @ApiProperty()
  @IsInt()
  id: string;
}
