import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  ActivityStreakResponseDto,
  DailyActivityDto,
} from 'src/models/stats/dto/activity-streak.dto';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserActivityStreak(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<ActivityStreakResponseDto> {
    const activities = await this.prisma.$queryRaw<DailyActivityDto[]>`
      WITH daily_counts AS (
        SELECT 
          DATE_TRUNC('day', time)::date as date,
          COUNT(*) as count
        FROM user_activities
        WHERE 
          user_id = ${userId}
          AND time >= ${startDate}::timestamp
          AND time <= ${endDate}::timestamp
        GROUP BY DATE_TRUNC('day', time)::date
      )
      SELECT
        to_char(d.date, 'YYYY-MM-DD') as date,
        CASE 
          WHEN count IS NULL THEN 0
          WHEN count <= 2 THEN 1
          WHEN count <= 4 THEN 2
          WHEN count <= 6 THEN 3
          ELSE 4
        END as level
      FROM generate_series(
        ${startDate}::date,
        ${endDate}::date,
        '1 day'
      ) d(date)
      LEFT JOIN daily_counts dc ON d.date = dc.date
      ORDER BY date;
    `;

    return { activities };
  }

  // async getSpaceStats(spaceId: string) {
  //   const [essays, notes, vocabularies, courses] = await Promise.all([
  //     this.prisma.essay.count({ where: { spaceId } }),
  //     this.prisma.note.count({ where: { spaceId } }),
  //     this.prisma.vocabulary.count({ where: { spaceId } }),
  //     this.prisma.spaceCourse.count({ where: { spaceId } }),
  //   ]);

  //   return {
  //     essays,
  //     notes,
  //     vocabularies,
  //     courses,
  //   };
  // }

  // // Admin Stats
  // async getRevenueTrends(interval: string = '1 day', days: number = 30) {
  //   return this.prisma.$queryRaw`
  //     SELECT
  //       time_bucket(${interval}::interval, timestamp) AS period,
  //       payment_type,
  //       SUM(amount) as total_amount,
  //       COUNT(DISTINCT user_id) as paying_users
  //     FROM revenue_metrics
  //     WHERE timestamp > NOW() - INTERVAL '${days} days'
  //     GROUP BY period, payment_type
  //     ORDER BY period DESC;
  //   `;
  // }

  // async getAdminOverview() {
  //   const [totalEssays, totalNotes, totalVocabs, totalCourses, totalUsers] =
  //     await Promise.all([
  //       this.prisma.essay.count(),
  //       this.prisma.note.count(),
  //       this.prisma.vocabulary.count(),
  //       this.prisma.course.count(),
  //       this.prisma.user.count(),
  //     ]);

  //   return {
  //     totalEssays,
  //     totalNotes,
  //     totalVocabs,
  //     totalCourses,
  //     totalUsers,
  //   };
  // }

  // async getUserGrowth(interval: string = '1 day', days: number = 30) {
  //   return this.prisma.$queryRaw`
  //     SELECT
  //       time_bucket(${interval}::interval, timestamp) AS period,
  //       COUNT(*) as new_users,
  //       event_type
  //     FROM user_growth_metrics
  //     WHERE
  //       timestamp > NOW() - INTERVAL '${days} days'
  //       AND event_type = 'registration'
  //     GROUP BY period, event_type
  //     ORDER BY period DESC;
  //   `;
  // }

  // async trackUserActivity(data: {
  //   userId: string;
  //   activityType: string;
  //   spaceId?: string;
  //   metadata?: any;
  // }) {
  //   return this.prisma.userActivity.create({
  //     data: {
  //       timestamp: new Date(),
  //       ...data,
  //     },
  //   });
  // }

  // async trackRevenue(data: {
  //   amount: number;
  //   paymentType: string;
  //   userId: string;
  //   metadata?: any;
  // }) {
  //   return this.prisma.revenueMetric.create({
  //     data: {
  //       timestamp: new Date(),
  //       ...data,
  //     },
  //   });
  // }

  // async trackUserGrowth(data: {
  //   userId: string;
  //   eventType: string;
  //   metadata?: any;
  // }) {
  //   return this.prisma.userGrowthMetric.create({
  //     data: {
  //       timestamp: new Date(),
  //       ...data,
  //     },
  //   });
  // }
}
