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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const course_service_1 = require("../course.service");
const check_join_course_dto_1 = require("../dto/check-join-course.dto");
const course_learn_response_dto_1 = require("../dto/course-learn-response.dto");
const course_progress_dto_1 = require("../dto/course-progress.dto");
const course_response_dto_1 = require("../dto/course-response.dto");
const create_course_dto_1 = require("../dto/create-course.dto");
const get_course_units_dto_1 = require("../dto/get-course-units.dto");
const get_courses_dto_1 = require("../dto/get-courses.dto");
const join_course_request_dto_1 = require("../dto/join-course-request.dto");
const join_course_response_dto_1 = require("../dto/join-course-response.dto");
const update_course_dto_1 = require("../dto/update-course.dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(user, createCourseDto) {
        const userId = String(user.sub);
        return this.courseService.create(createCourseDto, userId);
    }
    async update(id, updateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }
    async delete(id) {
        return this.courseService.delete(id);
    }
    async getCourses(query) {
        return this.courseService.getAll(query);
    }
    async getCourseById(id) {
        return this.courseService.getById(id);
    }
    async getCourseUnits(courseId, query) {
        return this.courseService.getCourseUnits(courseId, query);
    }
    async joinCourse(courseId, user, joinCourseRequestDto) {
        const userId = String(user.sub);
        return this.courseService.joinCourse(userId, courseId, joinCourseRequestDto.spaceId);
    }
    async learnCourse(courseId) {
        return this.courseService.getLearnCourse(courseId);
    }
    async checkJoin(courseId, spaceId) {
        return this.courseService.checkJoinedCourse(courseId, spaceId);
    }
    async getCourseProgress(courseId, user) {
        const userId = String(user.sub);
        return this.courseService.getCourseProgress(courseId, userId);
    }
    async updateCourseProgress(courseId, user, updateProgressDto) {
        const userId = String(user.sub);
        return this.courseService.updateCourseProgress(courseId, userId, updateProgressDto);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)(),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: course_response_dto_1.CourseResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: course_response_dto_1.CourseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: course_response_dto_1.CourseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: get_course_units_dto_1.CourseListResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_courses_dto_1.GetCoursesRequestDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: course_response_dto_1.CourseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseById", null);
__decorate([
    (0, common_1.Get)(':id/units'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: get_course_units_dto_1.CourseUnitResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_course_units_dto_1.GetCourseUnitsRequestDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseUnits", null);
__decorate([
    (0, common_1.Patch)(':id/join'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: join_course_response_dto_1.JoinCourseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, join_course_request_dto_1.JoinCourseRequestDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "joinCourse", null);
__decorate([
    (0, common_1.Get)(':id/learn'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: course_learn_response_dto_1.CourseLearnResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "learnCourse", null);
__decorate([
    (0, common_1.Get)(':id/check-join/:spaceId'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: check_join_course_dto_1.CheckJoinedCourseResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "checkJoin", null);
__decorate([
    (0, common_1.Get)(':id/progress'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: course_progress_dto_1.CourseProgressResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseProgress", null);
__decorate([
    (0, common_1.Patch)(':id/progress'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: course_progress_dto_1.CourseProgressResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, course_progress_dto_1.UpdateCourseProgressDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourseProgress", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiTags)('courses'),
    (0, common_1.Controller)('courses'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map