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
exports.LessonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class LessonDto {
}
exports.LessonDto = LessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], LessonDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], LessonDto.prototype, "unitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], LessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], LessonDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => Object,
    }),
    __metadata("design:type", Object)
], LessonDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'integer',
        format: 'int32',
    }),
    __metadata("design:type", Number)
], LessonDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], LessonDto.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], LessonDto.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.ContentStatus,
    }),
    __metadata("design:type", String)
], LessonDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], LessonDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], LessonDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], LessonDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        required: false,
    }),
    __metadata("design:type", Object)
], LessonDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        required: false,
    }),
    __metadata("design:type", Object)
], LessonDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        required: false,
    }),
    __metadata("design:type", Array)
], LessonDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        required: false,
    }),
    __metadata("design:type", Array)
], LessonDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        required: false,
    }),
    __metadata("design:type", Array)
], LessonDto.prototype, "currentInProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        required: false,
    }),
    __metadata("design:type", Array)
], LessonDto.prototype, "nextInProgress", void 0);
//# sourceMappingURL=lesson.dto.js.map