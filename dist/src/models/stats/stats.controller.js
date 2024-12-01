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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/auth/auth.guard");
const role_guard_1 = require("../../common/auth/role.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const activity_streak_dto_1 = require("./dto/activity-streak.dto");
const user_overview_dto_1 = require("./dto/user-overview.dto");
const stats_service_1 = require("./stats.service");
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getUserActivityStreak(currentUser, query) {
        const userId = String(currentUser.sub);
        const currentYear = new Date().getFullYear();
        const startDate = query.startDate || `${currentYear}-01-01`;
        const endDate = query.endDate || `${currentYear}-12-31`;
        return this.statsService.getUserActivityStreak(userId, startDate, endDate);
    }
    async getUserOverview(currentUser) {
        const userId = String(currentUser.sub);
        return this.statsService.getUserOverview(userId);
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)('user/activity-streak'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: activity_streak_dto_1.ActivityStreakResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, activity_streak_dto_1.GetActivityStreakDto]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getUserActivityStreak", null);
__decorate([
    (0, common_1.Get)('user/overview'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: user_overview_dto_1.UserOverviewDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getUserOverview", null);
exports.StatsController = StatsController = __decorate([
    (0, swagger_1.ApiTags)('stats'),
    (0, common_1.Controller)('stats'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map