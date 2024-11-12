import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsOptional } from 'class-validator';

export class GetActivityStreakDto {
  @ApiProperty({
    example: '2024-01-01',
    description: 'Start date for activity range',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'End date for activity range',
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
    description: 'Activity level (0-4): 0=no activity, 4=most active',
  })
  level: number;

  @ApiProperty({
    example: 5,
    description: 'Continuous days streak',
  })
  streak: number;
}

export class ActivityStreakResponseDto {
  @ApiProperty({
    type: [DailyActivityDto],
    description: 'Daily activity levels and streaks',
  })
  activities: DailyActivityDto[];

  @ApiProperty({
    type: DailyActivityDto,
    description: 'Current day activity and streak',
  })
  currentStreak: DailyActivityDto;
}
