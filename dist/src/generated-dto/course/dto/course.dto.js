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
exports.CourseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CourseDto {
}
exports.CourseDto = CourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "minLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "maxLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        isArray: true,
    }),
    __metadata("design:type", Array)
], CourseDto.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "courseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], CourseDto.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'integer',
        format: 'int32',
        nullable: true,
    }),
    __metadata("design:type", Number)
], CourseDto.prototype, "totalWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.ContentStatus,
    }),
    __metadata("design:type", String)
], CourseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], CourseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], CourseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], CourseDto.prototype, "deletedAt", void 0);
//# sourceMappingURL=course.dto.js.map