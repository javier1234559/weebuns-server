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
exports.CorrectionSentence = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
let CorrectionSentence = class CorrectionSentence {
};
exports.CorrectionSentence = CorrectionSentence;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CorrectionSentence.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], CorrectionSentence.prototype, "correctionId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], CorrectionSentence.prototype, "index", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'original text' }),
    __metadata("design:type", String)
], CorrectionSentence.prototype, "originalText", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'corrected text' }),
    __metadata("design:type", String)
], CorrectionSentence.prototype, "correctedText", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'explanation' }),
    __metadata("design:type", String)
], CorrectionSentence.prototype, "explanation", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CorrectionSentence.prototype, "isCorrect", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 4.5 }),
    __metadata("design:type", Number)
], CorrectionSentence.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: new Date().toISOString() }),
    __metadata("design:type", Date)
], CorrectionSentence.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: new Date().toISOString() }),
    __metadata("design:type", Date)
], CorrectionSentence.prototype, "updatedAt", void 0);
exports.CorrectionSentence = CorrectionSentence = __decorate([
    (0, graphql_1.ObjectType)()
], CorrectionSentence);
//# sourceMappingURL=correction-sentence.entity.js.map