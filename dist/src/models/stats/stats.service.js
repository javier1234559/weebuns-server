"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let StatsService = class StatsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserActivityStreak(userId, startDate, endDate) {
        const rawActivities = await this.prisma.$queryRaw `
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
        const [currentStreak] = await this.prisma.$queryRaw `
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
        const currentStreakData = currentStreak
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
    async getUserOverview(userId) {
        const [essayCount, vocabCount, notesCount, courseJoinedCount] = await Promise.all([
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
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatsService);
//# sourceMappingURL=stats.service.js.map