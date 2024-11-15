import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  ActivityStreakResponseDto,
  DailyActivityDto,
} from 'src/models/stats/dto/activity-streak.dto';
import { UserOverviewDto } from 'src/models/stats/dto/user-overview.dto';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserActivityStreak(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<ActivityStreakResponseDto> {
    // Get activities with streak count
    const activities = await this.prisma.$queryRaw<DailyActivityDto[]>`
      WITH daily_activities AS (
        SELECT 
          time::date as date,
          COUNT(*) as activity_count,
          MAX(streak_count) as streak_count  -- Get streak count
        FROM user_activities
        WHERE 
          user_id = ${userId}::uuid
          AND time >= ${startDate}::timestamp
          AND time <= ${endDate}::timestamp
        GROUP BY time::date
      )
      SELECT
        to_char(d.date, 'YYYY-MM-DD') as date,
        CASE 
          WHEN da.activity_count IS NULL THEN 0
          WHEN da.activity_count = 1 THEN 1
          WHEN da.activity_count = 2 THEN 2
          WHEN da.activity_count = 3 THEN 3
          ELSE 4
        END as level,
        COALESCE(da.streak_count, 0) as streak
      FROM generate_series(
        ${startDate}::date,
        ${endDate}::date,
        '1 day'
      ) d(date)
      LEFT JOIN daily_activities da ON d.date = da.date
      ORDER BY date DESC;
    `;

    // Get current day's activity
    const [currentStreak] = await this.prisma.$queryRaw<DailyActivityDto[]>`
      SELECT 
        to_char(time::date, 'YYYY-MM-DD') as date,
        CASE 
          WHEN COUNT(*) = 1 THEN 1
          WHEN COUNT(*) = 2 THEN 2
          WHEN COUNT(*) = 3 THEN 3
          ELSE 4
        END as level,
        MAX(streak_count) as streak
      FROM user_activities
      WHERE 
        user_id = ${userId}::uuid
        AND DATE_TRUNC('day', time) = DATE_TRUNC('day', NOW())
      GROUP BY time::date;
    `;

    return {
      activities,
      currentStreak: currentStreak || {
        date: new Date().toISOString().split('T')[0],
        level: 0,
        streak: 0,
      },
    };
  }

  async getUserOverview(userId: string): Promise<UserOverviewDto> {
    const [essayCount, vocabCount, courseJoinedCount, notesCount] =
      await Promise.all([
        this.prisma.essay.count({ where: { createdBy: userId } }),
        this.prisma.vocabulary.count({ where: { createdBy: userId } }),
        this.prisma.userCourse.count({ where: { userId } }),
        this.prisma.note.count({ where: { createdBy: userId } }),
      ]);

    return {
      essayCount,
      vocabCount,
      courseJoinedCount,
      notesCount,
    };
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
