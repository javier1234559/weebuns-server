import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export class GetActivityStreakDto {
  @ApiProperty({
    example: '2024-01-01',
    description:
      'Start date for activity range (defaults to start of current year)',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      // Default to start of current year
      const currentYear = new Date().getFullYear();
      return `${currentYear}-01-01`;
    }
    return value;
  })
  startDate?: string;

  @ApiProperty({
    example: '2024-12-31',
    description:
      'End date for activity range (defaults to end of current year)',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      // Default to end of current year
      const currentYear = new Date().getFullYear();
      const lastDayOfYear = new Date(currentYear, 11, 31)
        .toISOString()
        .split('T')[0];
      return lastDayOfYear;
    }
    return value;
  })
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
}

export class ActivityStreakResponseDto {
  @ApiProperty({
    type: [DailyActivityDto],
    description: 'Daily activity levels',
  })
  activities: DailyActivityDto[];
}
