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
exports.JoinCourseResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
class JoinCourseResponseDto {
}
exports.JoinCourseResponseDto = JoinCourseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], JoinCourseResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", Date)
], JoinCourseResponseDto.prototype, "joinedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_progress_entity_1.CourseProgress }),
    __metadata("design:type", course_progress_entity_1.CourseProgress)
], JoinCourseResponseDto.prototype, "progress", void 0);
//# sourceMappingURL=join-course-response.dto.js.map