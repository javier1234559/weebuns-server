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
exports.TranslateResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TranslateResponseDto {
}
exports.TranslateResponseDto = TranslateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello world' }),
    __metadata("design:type", String)
], TranslateResponseDto.prototype, "original_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hola mundo' }),
    __metadata("design:type", String)
], TranslateResponseDto.prototype, "translated_text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'English' }),
    __metadata("design:type", String)
], TranslateResponseDto.prototype, "source_language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Spanish' }),
    __metadata("design:type", String)
], TranslateResponseDto.prototype, "target_language", void 0);
//# sourceMappingURL=translate-response.dto.js.map