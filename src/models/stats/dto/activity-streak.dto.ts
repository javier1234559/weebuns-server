import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsOptional } from 'class-validator';

export class GetActivityStreakDto {
  @ApiProperty({
    example: '2024-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    example: '2024-12-31',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class DailyActivityDto {
  @ApiProperty({ example: '2024-03-15' })
  date: string;

  @ApiProperty({
    example: 2,
  })
  level: number;

  @ApiProperty({
    example: 5,
  })
  streak: number;
}

export class ActivityStreakResponseDto {
  @ApiProperty({
    type: [DailyActivityDto],
  })
  activities: DailyActivityDto[];

  @ApiProperty({
    type: DailyActivityDto,
  })
  currentStreak: DailyActivityDto;
}
