import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ActivityStreakResponseDto,
  GetActivityStreakDto,
} from 'src/models/stats/dto/activity-streak.dto';
import { StatsService } from 'src/models/stats/stats.service';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('user/activity-streak')
  @ApiResponse({
    status: 200,
    type: ActivityStreakResponseDto,
  })
  async getUserActivityStreak(
    @Req() req,
    @Query() query: GetActivityStreakDto,
  ): Promise<ActivityStreakResponseDto> {
    return this.statsService.getUserActivityStreak(
      req.user.id,
      query.startDate,
      query.endDate,
    );
  }
}
