import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { ActivityStreakResponseDto, GetActivityStreakDto } from 'src/models/stats/dto/activity-streak.dto';
import { UserOverviewDto } from 'src/models/stats/dto/user-overview.dto';
import { StatsService } from 'src/models/stats/stats.service';
export declare class StatsController {
    private statsService;
    constructor(statsService: StatsService);
    getUserActivityStreak(currentUser: IAuthPayload, query: GetActivityStreakDto): Promise<ActivityStreakResponseDto>;
    getUserOverview(currentUser: IAuthPayload): Promise<UserOverviewDto>;
}
