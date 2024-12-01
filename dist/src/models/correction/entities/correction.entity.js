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
exports.Correction = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const correction_reply_entity_1 = require("../../correction-reply/entities/correction-reply.entity");
const correction_sentence_entity_1 = require("../../correction-sentence/entities/correction-sentence.entity");
const essay_entity_1 = require("../../essay/entities/essay.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Correction = class Correction {
};
exports.Correction = Correction;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", String)
], Correction.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the essay being corrected' }),
    __metadata("design:type", String)
], Correction.prototype, "essayId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'Good structure but needs work on tenses',
        nullable: true,
        description: 'Overall feedback for the essay',
    }),
    __metadata("design:type", String)
], Correction.prototype, "overallComment", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: '8.0',
        nullable: true,
        description: 'Rating score for the essay',
        minimum: 0,
        maximum: 10,
    }),
    __metadata("design:type", Number)
], Correction.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'User ID who created the correction',
    }),
    __metadata("design:type", String)
], Correction.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Correction.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Correction.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Correction.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => essay_entity_1.Essay, { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: () => essay_entity_1.Essay, nullable: true }),
    __metadata("design:type", essay_entity_1.Essay)
], Correction.prototype, "essay", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Correction.prototype, "creator", void 0);
__decorate([
    (0, graphql_1.Field)(() => [correction_sentence_entity_1.CorrectionSentence], { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: () => [correction_sentence_entity_1.CorrectionSentence], nullable: true }),
    __metadata("design:type", Array)
], Correction.prototype, "sentences", void 0);
__decorate([
    (0, graphql_1.Field)(() => [correction_reply_entity_1.CorrectionReply], { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: () => [correction_reply_entity_1.CorrectionReply], nullable: true }),
    __metadata("design:type", Array)
], Correction.prototype, "replies", void 0);
exports.Correction = Correction = __decorate([
    (0, graphql_1.ObjectType)()
], Correction);
//# sourceMappingURL=correction.entity.js.map