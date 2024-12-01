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
exports.SpaceCoursesJoinedResponseDto = exports.CourseJoinedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const course_entity_1 = require("../../course/entities/course.entity");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
class CourseJoinedDto extends (0, swagger_1.OmitType)(course_entity_1.Course, ['progress']) {
}
exports.CourseJoinedDto = CourseJoinedDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_progress_entity_1.CourseProgress,
        nullable: true,
    }),
    __metadata("design:type", course_progress_entity_1.CourseProgress)
], CourseJoinedDto.prototype, "progress", void 0);
class SpaceCoursesJoinedResponseDto {
}
exports.SpaceCoursesJoinedResponseDto = SpaceCoursesJoinedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: CourseJoinedDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], SpaceCoursesJoinedResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: pagination_dto_1.PaginationOutputDto,
    }),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], SpaceCoursesJoinedResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=course-joined.dto.js.map