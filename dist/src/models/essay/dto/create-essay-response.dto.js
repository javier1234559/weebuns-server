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
exports.CreateEssayResponseDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const exist_entities_decorator_1 = require("../../../common/decorators/exist-entities.decorator");
const user_entity_1 = require("../../user/entities/user.entity");
let CreateEssayResponseDto = class CreateEssayResponseDto {
};
exports.CreateEssayResponseDto = CreateEssayResponseDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "id_space", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Updated: My Journey Learning English',
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Updated summary of my language learning experience',
        nullable: true,
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Updated content: Lorem ipsum dolor sit amet...',
        minLength: 1,
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 42,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], CreateEssayResponseDto.prototype, "upvote_count", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://example.com/images/updated-cover-123.jpg',
        nullable: true,
        pattern: '^https?://',
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "cover_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: client_1.ContentStatus.published,
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'en',
        minLength: 2,
        maxLength: 5,
    }),
    __metadata("design:type", String)
], CreateEssayResponseDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Author',
    }),
    __metadata("design:type", user_entity_1.User)
], CreateEssayResponseDto.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, exist_entities_decorator_1.ExistEntities)('hashtag', {
        message: 'One or more hashtags not found',
    }),
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        isArray: true,
    }),
    __metadata("design:type", Array)
], CreateEssayResponseDto.prototype, "hashtags", void 0);
exports.CreateEssayResponseDto = CreateEssayResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], CreateEssayResponseDto);
//# sourceMappingURL=create-essay-response.dto.js.map