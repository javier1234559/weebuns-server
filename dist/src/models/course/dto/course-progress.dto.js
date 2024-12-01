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
exports.UpdateCourseProgressDto = exports.CourseProgressResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
class CourseProgressResponseDto {
}
exports.CourseProgressResponseDto = CourseProgressResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: course_progress_entity_1.CourseProgress,
    }),
    __metadata("design:type", course_progress_entity_1.CourseProgress)
], CourseProgressResponseDto.prototype, "courseProgress", void 0);
class UpdateCourseProgressDto {
}
exports.UpdateCourseProgressDto = UpdateCourseProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateCourseProgressDto.prototype, "currentUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateCourseProgressDto.prototype, "currentLessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateCourseProgressDto.prototype, "nextUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateCourseProgressDto.prototype, "nextLessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UpdateCourseProgressDto.prototype, "completedWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], UpdateCourseProgressDto.prototype, "completedUnits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], UpdateCourseProgressDto.prototype, "completedLessons", void 0);
//# sourceMappingURL=course-progress.dto.js.map