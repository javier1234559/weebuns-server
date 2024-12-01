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
exports.CreateCorrectionSentenceDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let CreateCorrectionSentenceDto = class CreateCorrectionSentenceDto {
};
exports.CreateCorrectionSentenceDto = CreateCorrectionSentenceDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'Original text' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCorrectionSentenceDto.prototype, "original_text", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCorrectionSentenceDto.prototype, "index", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'Corrected text' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCorrectionSentenceDto.prototype, "corrected_text", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'Explanation of the correction' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCorrectionSentenceDto.prototype, "explanation", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CreateCorrectionSentenceDto.prototype, "is_correct", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 4 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCorrectionSentenceDto.prototype, "rating", void 0);
exports.CreateCorrectionSentenceDto = CreateCorrectionSentenceDto = __decorate([
    (0, graphql_1.InputType)()
], CreateCorrectionSentenceDto);
//# sourceMappingURL=create-correction-sentence.dto.js.map