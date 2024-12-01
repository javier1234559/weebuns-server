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
const swagger_1 = require("@nestjs/swagger");
const correction_reply_entity_1 = require("../../correction-reply/entities/correction-reply.entity");
const correction_sentence_entity_1 = require("../../correction-sentence/entities/correction-sentence.entity");
const essay_entity_1 = require("../../essay/entities/essay.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class Correction {
}
exports.Correction = Correction;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Correction.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Correction.prototype, "essayId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Correction.prototype, "overallComment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        format: 'float',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Correction.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Correction.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Correction.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Correction.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Correction.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => essay_entity_1.Essay,
        required: false,
    }),
    __metadata("design:type", essay_entity_1.Essay)
], Correction.prototype, "essay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Correction.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => correction_sentence_entity_1.CorrectionSentence,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Correction.prototype, "sentences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => correction_reply_entity_1.CorrectionReply,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Correction.prototype, "replies", void 0);
//# sourceMappingURL=correction.entity.js.map