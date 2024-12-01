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
exports.UpdateSubscriptionPaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class UpdateSubscriptionPaymentDto {
}
exports.UpdateSubscriptionPaymentDto = UpdateSubscriptionPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        format: 'double',
        required: false,
    }),
    __metadata("design:type", client_1.Prisma.Decimal)
], UpdateSubscriptionPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PaymentType,
        required: false,
    }),
    __metadata("design:type", String)
], UpdateSubscriptionPaymentDto.prototype, "paymentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        required: false,
    }),
    __metadata("design:type", Date)
], UpdateSubscriptionPaymentDto.prototype, "paymentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateSubscriptionPaymentDto.prototype, "status", void 0);
//# sourceMappingURL=update-subscription-payment.dto.js.map