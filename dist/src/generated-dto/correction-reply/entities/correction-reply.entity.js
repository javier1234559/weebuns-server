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
exports.CorrectionReply = void 0;
const swagger_1 = require("@nestjs/swagger");
const correction_entity_1 = require("../../correction/entities/correction.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class CorrectionReply {
}
exports.CorrectionReply = CorrectionReply;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CorrectionReply.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CorrectionReply.prototype, "correctionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CorrectionReply.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CorrectionReply.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], CorrectionReply.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], CorrectionReply.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => correction_entity_1.Correction,
        required: false,
    }),
    __metadata("design:type", correction_entity_1.Correction)
], CorrectionReply.prototype, "correction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], CorrectionReply.prototype, "creator", void 0);
//# sourceMappingURL=correction-reply.entity.js.map