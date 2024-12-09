import { ApiProperty } from '@nestjs/swagger';

import { Decimal } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class StatResponse {
  @ApiProperty({
    type: Number,
    description: 'Current value of the stat',
  })
  current: number | Decimal;

  @ApiProperty({
    type: Number,
    description: 'Previous value of the stat',
  })
  previous: number | Decimal;
}

export class StatItemDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ enum: ['users', 'currency', 'course', 'coursecomplete'] })
  @IsEnum(['users', 'currency', 'course', 'coursecomplete'])
  type: 'users' | 'currency' | 'course' | 'coursecomplete';

  @ApiProperty({ type: StatResponse })
  @ValidateNested()
  @Type(() => StatResponse)
  stats: StatResponse;
}

export class AdminStatsOverviewDto {
  @ApiProperty({ type: [StatItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatItemDto)
  data: StatItemDto[];
}

export class GrowthDataPoint {
  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsNumber()
  value: number;
}

export class GrowthDataDto {
  @ApiProperty({ type: [GrowthDataPoint] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GrowthDataPoint)
  data: GrowthDataPoint[];
}
