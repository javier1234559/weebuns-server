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
exports.CreateSpaceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../../common/enum/common");
class CreateSpaceDto {
}
exports.CreateSpaceDto = CreateSpaceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: common_1.LanguageCode,
        example: common_1.LanguageCode.ENGLISH,
    }),
    (0, class_validator_1.IsEnum)(common_1.LanguageCode),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: common_1.TargetCode,
        example: common_1.TargetCode.COMMUNICATION,
    }),
    (0, class_validator_1.IsEnum)(common_1.TargetCode),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: common_1.LevelCode,
        example: common_1.LevelCode.INTERMEDIATE,
        description: 'Current proficiency level',
    }),
    (0, class_validator_1.IsEnum)(common_1.LevelCode),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "currentLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: [common_1.TopicCode.BUSINESS, common_1.TopicCode.ACADEMIC],
        isArray: true,
    }),
    __metadata("design:type", Array)
], CreateSpaceDto.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: common_1.LevelCode,
        example: common_1.LevelCode.ADVANCED,
        description: 'Target proficiency level to achieve',
    }),
    (0, class_validator_1.IsEnum)(common_1.LevelCode),
    __metadata("design:type", String)
], CreateSpaceDto.prototype, "targetLevel", void 0);
//# sourceMappingURL=create-space.dto.js.map