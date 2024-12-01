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
exports.UpdateEssayDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class UpdateEssayDto {
}
exports.UpdateEssayDto = UpdateEssayDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Updated: My Journey Learning English',
        minLength: 1,
        maxLength: 255,
    }),
    __metadata("design:type", String)
], UpdateEssayDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Updated summary of my language learning experience',
        nullable: true,
    }),
    __metadata("design:type", String)
], UpdateEssayDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Updated content: Lorem ipsum dolor sit amet...',
        minLength: 1,
    }),
    __metadata("design:type", String)
], UpdateEssayDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 42,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], UpdateEssayDto.prototype, "upvote_count", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://example.com/images/updated-cover-123.jpg',
        nullable: true,
        pattern: '^https?://',
    }),
    __metadata("design:type", String)
], UpdateEssayDto.prototype, "cover_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.ContentStatus,
        example: client_1.ContentStatus.published,
        enumName: 'ContentStatus',
    }),
    __metadata("design:type", String)
], UpdateEssayDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'en',
        minLength: 2,
        maxLength: 5,
    }),
    __metadata("design:type", String)
], UpdateEssayDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        isArray: true,
    }),
    __metadata("design:type", Array)
], UpdateEssayDto.prototype, "hashtag_names", void 0);
//# sourceMappingURL=update-essay.dto.js.map