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
exports.SpaceCourseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const library_1 = require("@prisma/client/runtime/library");
const common_1 = require("../../../common/enum/common");
const course_creator_dto_1 = require("../../course/dto/course-creator.dto");
class SpaceCourseDto {
}
exports.SpaceCourseDto = SpaceCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], SpaceCourseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], SpaceCourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', nullable: true }),
    __metadata("design:type", String)
], SpaceCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', nullable: true }),
    __metadata("design:type", String)
], SpaceCourseDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_1.LevelCode }),
    __metadata("design:type", String)
], SpaceCourseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', nullable: true }),
    __metadata("design:type", library_1.Decimal)
], SpaceCourseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    __metadata("design:type", Number)
], SpaceCourseDto.prototype, "totalWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], SpaceCourseDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", Date)
], SpaceCourseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_creator_dto_1.CourseCreatorDto }),
    __metadata("design:type", course_creator_dto_1.CourseCreatorDto)
], SpaceCourseDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], SpaceCourseDto.prototype, "is_joined", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', nullable: true }),
    __metadata("design:type", Date)
], SpaceCourseDto.prototype, "joined_at", void 0);
//# sourceMappingURL=space-course.dto.js.map