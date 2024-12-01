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
exports.SpaceCoursesAllResponseDto = exports.CourseWithJoinStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class CourseWithJoinStatus {
}
exports.CourseWithJoinStatus = CourseWithJoinStatus;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "minLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "maxLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], CourseWithJoinStatus.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "courseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CourseWithJoinStatus.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CourseWithJoinStatus.prototype, "totalWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CourseWithJoinStatus.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseWithJoinStatus.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CourseWithJoinStatus.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CourseWithJoinStatus.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CourseWithJoinStatus.prototype, "isJoined", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Date)
], CourseWithJoinStatus.prototype, "joinedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => course_progress_entity_1.CourseProgress, nullable: true }),
    __metadata("design:type", course_progress_entity_1.CourseProgress)
], CourseWithJoinStatus.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], CourseWithJoinStatus.prototype, "creator", void 0);
class SpaceCoursesAllResponseDto {
}
exports.SpaceCoursesAllResponseDto = SpaceCoursesAllResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CourseWithJoinStatus] }),
    __metadata("design:type", Array)
], SpaceCoursesAllResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], SpaceCoursesAllResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=space-course-all-response.dto.js.map