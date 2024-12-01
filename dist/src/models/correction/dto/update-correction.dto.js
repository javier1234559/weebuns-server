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
exports.UpdateCorrectionDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const update_correction_sentence_dto_1 = require("../../correction-sentence/dto/update-correction-sentence.dto");
let UpdateCorrectionDto = class UpdateCorrectionDto {
};
exports.UpdateCorrectionDto = UpdateCorrectionDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateCorrectionDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Overall comment', nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCorrectionDto.prototype, "overall_comment", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 4.5, nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCorrectionDto.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => [update_correction_sentence_dto_1.UpdateCorrectionSentenceDto]),
    (0, swagger_1.ApiProperty)({ type: [update_correction_sentence_dto_1.UpdateCorrectionSentenceDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => update_correction_sentence_dto_1.UpdateCorrectionSentenceDto),
    __metadata("design:type", Array)
], UpdateCorrectionDto.prototype, "sentences", void 0);
exports.UpdateCorrectionDto = UpdateCorrectionDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateCorrectionDto);
//# sourceMappingURL=update-correction.dto.js.map