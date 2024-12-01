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
exports.ActivityInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../prisma/prisma.service");
let ActivityInterceptor = class ActivityInterceptor {
    constructor(prisma) {
        this.prisma = prisma;
        this.fixedPaths = [
            '/api/essays',
            '/api/notes',
            '/api/vocabularies',
        ];
        this.pathPatterns = [
            /^\/api\/courses\/[^/]+\/progress$/,
        ];
    }
    isTrackablePath(path) {
        return (this.fixedPaths.some((fixedPath) => path.startsWith(fixedPath)) ||
            this.pathPatterns.some((pattern) => pattern.test(path)));
    }
    async intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userId = String(user?.sub);
        return next.handle().pipe((0, rxjs_1.tap)(async () => {
            try {
                if (userId &&
                    ['POST', 'PUT', 'PATCH'].includes(request.method) &&
                    this.isTrackablePath(request.path)) {
                    await this.trackActivity(userId);
                }
            }
            catch (error) {
                console.error('❌ Activity tracking error:', error);
            }
        }));
    }
    async trackActivity(userId) {
        try {
            const [todayActivity] = await this.prisma.$queryRaw `
        SELECT *
        FROM user_activities
        WHERE user_id = ${userId}::uuid
          AND DATE_TRUNC('day', time) = DATE_TRUNC('day', NOW())
        LIMIT 1;
      `;
            if (todayActivity) {
                await this.prisma.$executeRaw `
          UPDATE user_activities
          SET activity_count = activity_count + 1
          WHERE user_id = ${userId}::uuid
            AND DATE_TRUNC('day', time) = DATE_TRUNC('day', NOW());
        `;
                console.log('Updated activity count for today');
            }
            else {
                const [yesterdayActivity] = await this.prisma.$queryRaw `
          SELECT streak_count
          FROM user_activities
          WHERE user_id = ${userId}::uuid
            AND DATE_TRUNC('day', time) = DATE_TRUNC('day', NOW() - INTERVAL '1 day')
          LIMIT 1;
        `;
                const newStreakCount = yesterdayActivity
                    ? yesterdayActivity.streak_count + 1
                    : 1;
                await this.prisma.$executeRaw `
          INSERT INTO user_activities (
            time,
            user_id,
            activity_count,
            streak_count
          )
          VALUES (
            NOW(),
            ${userId}::uuid,
            1,
            ${newStreakCount}
          );
        `;
                console.log('Created new activity for today');
            }
        }
        catch (error) {
            console.error('Error in trackActivity:', error);
            throw error;
        }
    }
};
exports.ActivityInterceptor = ActivityInterceptor;
exports.ActivityInterceptor = ActivityInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivityInterceptor);
//# sourceMappingURL=activity.interceptor.js.map