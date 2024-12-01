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
exports.CreateCorrectionDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const exist_entity_decorator_1 = require("../../../common/decorators/exist-entity.decorator");
const create_correction_sentence_dto_1 = require("../../correction-sentence/dto/create-correction-sentence.dto");
let CreateCorrectionDto = class CreateCorrectionDto {
};
exports.CreateCorrectionDto = CreateCorrectionDto;
__decorate([
    (0, exist_entity_decorator_1.ExistEntity)('essay'),
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCorrectionDto.prototype, "essay_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Overall comment', nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCorrectionDto.prototype, "overall_comment", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 4, nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCorrectionDto.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => [create_correction_sentence_dto_1.CreateCorrectionSentenceDto]),
    (0, swagger_1.ApiProperty)({ type: [create_correction_sentence_dto_1.CreateCorrectionSentenceDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => create_correction_sentence_dto_1.CreateCorrectionSentenceDto),
    __metadata("design:type", Array)
], CreateCorrectionDto.prototype, "sentences", void 0);
exports.CreateCorrectionDto = CreateCorrectionDto = __decorate([
    (0, graphql_1.InputType)()
], CreateCorrectionDto);
//# sourceMappingURL=create-correction.dto.js.map