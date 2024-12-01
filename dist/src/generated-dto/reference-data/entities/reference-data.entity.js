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
exports.ReferenceData = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class ReferenceData {
}
exports.ReferenceData = ReferenceData;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], ReferenceData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], ReferenceData.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], ReferenceData.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], ReferenceData.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => Object,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ReferenceData.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], ReferenceData.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'integer',
        format: 'int32',
    }),
    __metadata("design:type", Number)
], ReferenceData.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], ReferenceData.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], ReferenceData.prototype, "updatedAt", void 0);
//# sourceMappingURL=reference-data.entity.js.map