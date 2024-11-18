import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsOptional } from 'class-validator';

export interface RawActivityDto {
  date: string;
  level: number;
  streak: number;
}

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

export class ActivityDataDto {
  @ApiProperty({
    example: 2,
  })
  level: number;

  @ApiProperty({
    example: {
      streak: 5,
    },
  })
  data: {
    streak: number;
  };
}

export class ActivityStreakResponseDto {
  @ApiProperty({
    example: [
      {
        '2024-03-15': {
          level: 2,
          data: {
            streak: 5,
          },
        },
      },
    ],
    isArray: true,
    type: 'array',
  })
  activities: Record<string, ActivityDataDto>[];

  @ApiProperty({
    example: {
      level: 2,
      data: {
        streak: 5,
      },
    },
  })
  currentStreak: ActivityDataDto;
}
