import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class UnitContentProgressUnitProgressIdUnitContentIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  unitProgressId: string;
  @ApiProperty({
    type: 'string',
  })
  unitContentId: string;
}

@ApiExtraModels(UnitContentProgressUnitProgressIdUnitContentIdUniqueInputDto)
export class ConnectUnitContentProgressDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    type: UnitContentProgressUnitProgressIdUnitContentIdUniqueInputDto,
    required: false,
    nullable: true,
  })
  unitProgressId_unitContentId?: UnitContentProgressUnitProgressIdUnitContentIdUniqueInputDto;
}
