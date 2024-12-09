import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  ActivityDataDto,
  ActivityStreakResponseDto,
  RawActivityDto,
} from 'src/models/stats/dto/activity-streak.dto';
import {
  AdminStatsOverviewDto,
  GrowthDataDto,
} from 'src/models/stats/dto/admin-stats.dto';
import { UserOverviewDto } from 'src/models/stats/dto/user-overview.dto';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserActivityStreak(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<ActivityStreakResponseDto> {
    const rawActivities = await this.prisma.$queryRaw<RawActivityDto[]>`
    WITH daily_activities AS (
      SELECT 
        time::date as date,
        COUNT(*) as activity_count,
        MAX(streak_count) as streak_count
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

    const activities = rawActivities.map((activity) => ({
      [activity.date]: {
        level: activity.level,
        data: {
          streak: activity.streak,
        },
      },
    }));

    const [currentStreak] = await this.prisma.$queryRaw<RawActivityDto[]>`
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

    const currentStreakData: ActivityDataDto = currentStreak
      ? {
          level: currentStreak.level,
          data: {
            streak: currentStreak.streak,
          },
        }
      : {
          level: 0,
          data: {
            streak: 0,
          },
        };

    return {
      activities,
      currentStreak: currentStreakData,
    };
  }
  async getUserOverview(userId: string): Promise<UserOverviewDto> {
    const [essayCount, vocabCount, notesCount, courseJoinedCount] =
      await Promise.all([
        this.prisma.essay.count({
          where: {
            createdBy: userId,
            deletedAt: null,
          },
        }),
        this.prisma.vocabulary.count({
          where: {
            createdBy: userId,
            deletedAt: null,
          },
        }),
        this.prisma.note.count({
          where: {
            createdBy: userId,
            deletedAt: null,
          },
        }),
        this.prisma.spaceCourse.count({
          where: {
            space: {
              createdBy: userId,
              deletedAt: null,
            },
          },
        }),
      ]);

    return {
      essayCount,
      vocabCount,
      courseJoinedCount,
      notesCount,
    };
  }

  async getAdminStatsOverview(): Promise<AdminStatsOverviewDto> {
    console.log('getAdminStatsOverview');

    // Get current period data (this month)
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    // Get previous period data (last month)
    const firstDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    const lastDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    );

    const [
      currentUsers,
      previousUsers,
      currentRevenue,
      previousRevenue,
      currentCourses,
      previousCourses,
      completionRates,
    ] = await Promise.all([
      // Users count
      this.prisma.user.count({
        where: {
          createdAt: {
            lte: lastDayOfMonth,
          },
        },
      }),
      this.prisma.user.count({
        where: {
          createdAt: {
            lte: lastDayOfLastMonth,
          },
        },
      }),

      // Revenue calculations
      this.prisma.subscriptionPayment.aggregate({
        where: {
          paymentDate: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
          status: 'SUCCESS',
        },
        _sum: {
          amount: true,
        },
      }),
      this.prisma.subscriptionPayment.aggregate({
        where: {
          paymentDate: {
            gte: firstDayOfLastMonth,
            lte: lastDayOfLastMonth,
          },
          status: 'SUCCESS',
        },
        _sum: {
          amount: true,
        },
      }),

      // Courses count
      this.prisma.course.count({
        where: {
          createdAt: {
            lte: lastDayOfMonth,
          },
          status: 'published',
        },
      }),
      this.prisma.course.count({
        where: {
          createdAt: {
            lte: lastDayOfLastMonth,
          },
          status: 'published',
        },
      }),

      // Course completion calculation
      this.calculateCourseCompletionRates(
        firstDayOfMonth,
        lastDayOfMonth,
        firstDayOfLastMonth,
        lastDayOfLastMonth,
      ),
    ]);

    return {
      data: [
        {
          id: 1,
          type: 'users',
          stats: {
            current: currentUsers,
            previous: previousUsers,
          },
        },
        {
          id: 2,
          type: 'currency',
          stats: {
            current: currentRevenue._sum.amount || 0,
            previous: previousRevenue._sum.amount || 0,
          },
        },
        {
          id: 3,
          type: 'course',
          stats: {
            current: currentCourses,
            previous: previousCourses,
          },
        },
        {
          id: 4,
          type: 'coursecomplete',
          stats: {
            current: completionRates.current,
            previous: completionRates.previous,
          },
        },
      ],
    };
  }

  private async calculateCourseCompletionRates(
    currentStart: Date,
    currentEnd: Date,
    previousStart: Date,
    previousEnd: Date,
  ): Promise<{ current: number; previous: number }> {
    const [currentRate, previousRate] = await Promise.all([
      this.prisma.$queryRaw<[{ rate: number }]>`
        SELECT 
          ROUND(
            COUNT(CASE WHEN cp.completed_weight >= c.total_weight THEN 1 END)::DECIMAL / 
            NULLIF(COUNT(*), 0) * 100,
            1
          ) as rate
        FROM course_progress cp
        JOIN courses c ON cp.course_id = c.id
        WHERE cp.last_accessed_at BETWEEN ${currentStart} AND ${currentEnd}
      `,
      this.prisma.$queryRaw<[{ rate: number }]>`
        SELECT 
          ROUND(
            COUNT(CASE WHEN cp.completed_weight >= c.total_weight THEN 1 END)::DECIMAL / 
            NULLIF(COUNT(*), 0) * 100,
            1
          ) as rate
        FROM course_progress cp
        JOIN courses c ON cp.course_id = c.id
        WHERE cp.last_accessed_at BETWEEN ${previousStart} AND ${previousEnd}
      `,
    ]);

    return {
      current: currentRate[0]?.rate || 0,
      previous: previousRate[0]?.rate || 0,
    };
  }

  async getMonthlyUserGrowth(): Promise<GrowthDataDto> {
    const last12Months = await this.prisma.$queryRaw<
      Array<{
        date: string;
        value: number;
      }>
    >`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') as date,
        CAST(COUNT(*) AS INTEGER) as value
      FROM users
      WHERE created_at >= NOW() - INTERVAL '1 year'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY date ASC
    `;

    return { data: last12Months };
  }

  async getMonthlyRevenue(): Promise<GrowthDataDto> {
    const last12Months = await this.prisma.$queryRaw<
      { date: string; value: number }[]
    >`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', payment_date), 'YYYY-MM') as date,
        ROUND(SUM(amount)::numeric, 2) as value
      FROM subscription_payments
      WHERE 
        payment_date >= NOW() - INTERVAL '1 year'
        AND status = 'SUCCESS'
      GROUP BY DATE_TRUNC('month', payment_date)
      ORDER BY date ASC
    `;

    return { data: last12Months };
  }
}
