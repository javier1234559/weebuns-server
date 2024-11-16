import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import {
  ActivityStreakResponseDto,
  GetActivityStreakDto,
} from 'src/models/stats/dto/activity-streak.dto';
import { UserOverviewDto } from 'src/models/stats/dto/user-overview.dto';
import { StatsService } from 'src/models/stats/stats.service';

@ApiTags('stats')
@Controller('stats')
@UseGuards(AuthGuard, RolesGuard)
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('user/activity-streak')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: 200,
    type: ActivityStreakResponseDto,
  })
  async getUserActivityStreak(
    @CurrentUser() currentUser: IAuthPayload,
    @Query() query: GetActivityStreakDto,
  ): Promise<ActivityStreakResponseDto> {
    const userId = String(currentUser.sub);
    const currentYear = new Date().getFullYear();
    const startDate = query.startDate || `${currentYear}-01-01`;
    const endDate = query.endDate || `${currentYear}-12-31`;
    return this.statsService.getUserActivityStreak(userId, startDate, endDate);
  }

  @Get('user/overview')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: 200,
    type: UserOverviewDto,
  })
  async getUserOverview(
    @CurrentUser() currentUser: IAuthPayload,
  ): Promise<UserOverviewDto> {
    const userId = String(currentUser.sub);
    return this.statsService.getUserOverview(userId);
  }
}
