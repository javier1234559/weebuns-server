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
exports.CorrectionCredit = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const user_entity_1 = require("../../user/entities/user.entity");
class CorrectionCredit {
}
exports.CorrectionCredit = CorrectionCredit;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CorrectionCredit.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CorrectionCredit.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'integer',
        format: 'int32',
    }),
    __metadata("design:type", Number)
], CorrectionCredit.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        format: 'double',
    }),
    __metadata("design:type", client_1.Prisma.Decimal)
], CorrectionCredit.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], CorrectionCredit.prototype, "paymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PaymentType,
    }),
    __metadata("design:type", String)
], CorrectionCredit.prototype, "paymentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], CorrectionCredit.prototype, "expireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], CorrectionCredit.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], CorrectionCredit.prototype, "user", void 0);
//# sourceMappingURL=correction-credit.entity.js.map