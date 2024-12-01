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
exports.SubscriptionPaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class SubscriptionPaymentDto {
}
exports.SubscriptionPaymentDto = SubscriptionPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], SubscriptionPaymentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        format: 'double',
    }),
    __metadata("design:type", client_1.Prisma.Decimal)
], SubscriptionPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PaymentType,
    }),
    __metadata("design:type", String)
], SubscriptionPaymentDto.prototype, "paymentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], SubscriptionPaymentDto.prototype, "paymentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], SubscriptionPaymentDto.prototype, "status", void 0);
//# sourceMappingURL=subscription-payment.dto.js.map