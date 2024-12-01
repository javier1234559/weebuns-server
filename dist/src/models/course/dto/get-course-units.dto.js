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
exports.CourseUnitResponseDto = exports.UnitWithLessonsDto = exports.CourseListResponseDto = exports.GetCourseUnitsRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const course_entity_1 = require("../entities/course.entity");
const lesson_without_content_dto_1 = require("../../lesson/dto/lesson-without-content.dto");
class GetCourseUnitsRequestDto extends pagination_dto_1.PaginationInputDto {
}
exports.GetCourseUnitsRequestDto = GetCourseUnitsRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCourseUnitsRequestDto.prototype, "search", void 0);
class CourseListResponseDto {
}
exports.CourseListResponseDto = CourseListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [course_entity_1.Course] }),
    __metadata("design:type", Array)
], CourseListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: pagination_dto_1.PaginationOutputDto }),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], CourseListResponseDto.prototype, "pagination", void 0);
class UnitWithLessonsDto {
}
exports.UnitWithLessonsDto = UnitWithLessonsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UnitWithLessonsDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UnitWithLessonsDto.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UnitWithLessonsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UnitWithLessonsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [lesson_without_content_dto_1.LessonWithoutContent] }),
    __metadata("design:type", Array)
], UnitWithLessonsDto.prototype, "lessons", void 0);
class CourseUnitResponseDto {
}
exports.CourseUnitResponseDto = CourseUnitResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UnitWithLessonsDto] }),
    __metadata("design:type", Array)
], CourseUnitResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: pagination_dto_1.PaginationOutputDto }),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], CourseUnitResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=get-course-units.dto.js.map