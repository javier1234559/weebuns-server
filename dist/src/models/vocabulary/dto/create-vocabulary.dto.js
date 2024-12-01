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
exports.CreateVocabularyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateVocabularyDto {
}
exports.CreateVocabularyDto = CreateVocabularyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "spaceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "term", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVocabularyDto.prototype, "meaning", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false, nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "exampleSentence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false, nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false, nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "referenceLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', required: false, nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "referenceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        required: false,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateVocabularyDto.prototype, "nextReview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : JSON.parse(value))),
    __metadata("design:type", Array)
], CreateVocabularyDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        required: false,
        nullable: true,
        example: 1,
        description: 'Repetition level from 0 to 6',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([0, 1, 2, 3, 4, 5, 6], {
        message: 'repetitionLevel must be between 0 and 6',
    }),
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined ? parseInt(value, 10) : null)),
    __metadata("design:type", Number)
], CreateVocabularyDto.prototype, "repetitionLevel", void 0);
//# sourceMappingURL=create-vocabulary.dto.js.map