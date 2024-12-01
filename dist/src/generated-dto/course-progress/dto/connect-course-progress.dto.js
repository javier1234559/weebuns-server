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
exports.ConnectCourseProgressDto = exports.CourseProgressUserIdCourseIdUniqueInputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CourseProgressUserIdCourseIdUniqueInputDto {
}
exports.CourseProgressUserIdCourseIdUniqueInputDto = CourseProgressUserIdCourseIdUniqueInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseProgressUserIdCourseIdUniqueInputDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseProgressUserIdCourseIdUniqueInputDto.prototype, "courseId", void 0);
let ConnectCourseProgressDto = class ConnectCourseProgressDto {
};
exports.ConnectCourseProgressDto = ConnectCourseProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        required: false,
        nullable: true,
    }),
    __metadata("design:type", String)
], ConnectCourseProgressDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: CourseProgressUserIdCourseIdUniqueInputDto,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", CourseProgressUserIdCourseIdUniqueInputDto)
], ConnectCourseProgressDto.prototype, "userId_courseId", void 0);
exports.ConnectCourseProgressDto = ConnectCourseProgressDto = __decorate([
    (0, swagger_1.ApiExtraModels)(CourseProgressUserIdCourseIdUniqueInputDto)
], ConnectCourseProgressDto);
//# sourceMappingURL=connect-course-progress.dto.js.map