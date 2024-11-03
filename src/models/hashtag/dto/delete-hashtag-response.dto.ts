import { ApiProperty } from '@nestjs/swagger';

import { Hashtag } from '../entities/hashtag.entity';

export class DeleteHashtagResponseDto {
  @ApiProperty({ type: Hashtag })
  hashtag: Hashtag;
}
