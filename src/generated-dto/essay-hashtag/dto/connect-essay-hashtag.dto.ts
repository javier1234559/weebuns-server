import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class EssayHashtagEssayIdHashtagIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  essayId: string;
  @ApiProperty({
    type: 'string',
  })
  hashtagId: string;
}

@ApiExtraModels(EssayHashtagEssayIdHashtagIdUniqueInputDto)
export class ConnectEssayHashtagDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    type: EssayHashtagEssayIdHashtagIdUniqueInputDto,
    required: false,
    nullable: true,
  })
  essayId_hashtagId?: EssayHashtagEssayIdHashtagIdUniqueInputDto;
}
