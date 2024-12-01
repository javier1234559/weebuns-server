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
exports.CorrectionResponseOneDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../user/entities/user.entity");
const correction_sentence_entity_1 = require("../../correction-sentence/entities/correction-sentence.entity");
let CorrectionResponseOneDto = class CorrectionResponseOneDto {
};
exports.CorrectionResponseOneDto = CorrectionResponseOneDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CorrectionResponseOneDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CorrectionResponseOneDto.prototype, "essayId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CorrectionResponseOneDto.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'Overall comment', nullable: true }),
    __metadata("design:type", String)
], CorrectionResponseOneDto.prototype, "overall_comment", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 4, nullable: true }),
    __metadata("design:type", Number)
], CorrectionResponseOneDto.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], CorrectionResponseOneDto.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], CorrectionResponseOneDto.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: user_entity_1.User, nullable: true }),
    __metadata("design:type", user_entity_1.User)
], CorrectionResponseOneDto.prototype, "creator", void 0);
__decorate([
    (0, graphql_1.Field)(() => [correction_sentence_entity_1.CorrectionSentence], { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: [correction_sentence_entity_1.CorrectionSentence], nullable: true }),
    __metadata("design:type", Array)
], CorrectionResponseOneDto.prototype, "sentences", void 0);
exports.CorrectionResponseOneDto = CorrectionResponseOneDto = __decorate([
    (0, graphql_1.ObjectType)()
], CorrectionResponseOneDto);
//# sourceMappingURL=correction-one-response.dto.js.map