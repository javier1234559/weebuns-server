import { PrismaService } from 'src/common/prisma/prisma.service';
import { ActivityStreakResponseDto } from 'src/models/stats/dto/activity-streak.dto';
import { UserOverviewDto } from 'src/models/stats/dto/user-overview.dto';
export declare class StatsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserActivityStreak(userId: string, startDate: string, endDate: string): Promise<ActivityStreakResponseDto>;
    getUserOverview(userId: string): Promise<UserOverviewDto>;
}
