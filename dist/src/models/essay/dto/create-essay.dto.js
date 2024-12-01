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
exports.CreateEssayDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const exist_entity_decorator_1 = require("../../../common/decorators/exist-entity.decorator");
class CreateEssayDto {
}
exports.CreateEssayDto = CreateEssayDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'My Journey Learning English',
    }),
    __metadata("design:type", String)
], CreateEssayDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
    }),
    __metadata("design:type", String)
], CreateEssayDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    }),
    __metadata("design:type", String)
], CreateEssayDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://example.com/images/cover-123.jpg',
        nullable: true,
        pattern: '^https?://',
    }),
    __metadata("design:type", String)
], CreateEssayDto.prototype, "cover_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.ContentStatus,
        example: client_1.ContentStatus.published,
        enumName: 'ContentStatus',
    }),
    __metadata("design:type", String)
], CreateEssayDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'en',
        minLength: 2,
        maxLength: 5,
    }),
    __metadata("design:type", String)
], CreateEssayDto.prototype, "language", void 0);
__decorate([
    (0, exist_entity_decorator_1.ExistEntity)('space'),
    (0, swagger_1.ApiProperty)({
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], CreateEssayDto.prototype, "spaceId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, swagger_1.ApiPropertyOptional)({
        type: 'array',
        items: {
            type: 'string',
            example: 'english',
            minLength: 2,
            maxLength: 50,
        },
        example: ['english', 'travel'],
    }),
    __metadata("design:type", Array)
], CreateEssayDto.prototype, "hashtag_names", void 0);
//# sourceMappingURL=create-essay.dto.js.map