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
exports.GetUnitResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const unit_entity_1 = require("../entities/unit.entity");
class GetUnitResponseDto {
}
exports.GetUnitResponseDto = GetUnitResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: unit_entity_1.Unit }),
    __metadata("design:type", unit_entity_1.Unit)
], GetUnitResponseDto.prototype, "unit", void 0);
//# sourceMappingURL=get-unit-response.dto.js.map