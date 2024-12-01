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
exports.CheckGrammarResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PositionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
    }),
    __metadata("design:type", Number)
], PositionDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
    }),
    __metadata("design:type", Number)
], PositionDto.prototype, "end", void 0);
class CorrectionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'grammer',
    }),
    __metadata("design:type", String)
], CorrectionDto.prototype, "original", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'grammar',
    }),
    __metadata("design:type", String)
], CorrectionDto.prototype, "corrected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], CorrectionDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['grammar', 'spelling', 'punctuation', 'style'],
        example: 'spelling',
    }),
    __metadata("design:type", String)
], CorrectionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => PositionDto,
    }),
    __metadata("design:type", PositionDto)
], CorrectionDto.prototype, "position", void 0);
class CheckGrammarResponseDto {
}
exports.CheckGrammarResponseDto = CheckGrammarResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [CorrectionDto],
    }),
    __metadata("design:type", Array)
], CheckGrammarResponseDto.prototype, "corrections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Found 2 spelling errors and 1 grammar mistake.',
    }),
    __metadata("design:type", String)
], CheckGrammarResponseDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 85,
        minimum: 0,
        maximum: 100,
    }),
    __metadata("design:type", Number)
], CheckGrammarResponseDto.prototype, "overall_score", void 0);
//# sourceMappingURL=check-grammar-response.dto.js.map