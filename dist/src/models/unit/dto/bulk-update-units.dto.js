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
exports.BulkUpdateUnitsResponseDto = exports.BulkUpdateUnitsDto = exports.UnitWithLessonsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lesson_without_content_dto_1 = require("../../lesson/dto/lesson-without-content.dto");
class UnitWithLessonsDto {
}
exports.UnitWithLessonsDto = UnitWithLessonsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UnitWithLessonsDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UnitWithLessonsDto.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UnitWithLessonsDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UnitWithLessonsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UnitWithLessonsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [lesson_without_content_dto_1.LessonWithoutContent] }),
    __metadata("design:type", Array)
], UnitWithLessonsDto.prototype, "lessons", void 0);
class BulkUpdateUnitsDto {
}
exports.BulkUpdateUnitsDto = BulkUpdateUnitsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkUpdateUnitsDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UnitWithLessonsDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UnitWithLessonsDto),
    __metadata("design:type", Array)
], BulkUpdateUnitsDto.prototype, "units", void 0);
class BulkUpdateUnitsResponseDto {
}
exports.BulkUpdateUnitsResponseDto = BulkUpdateUnitsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UnitWithLessonsDto] }),
    __metadata("design:type", Array)
], BulkUpdateUnitsResponseDto.prototype, "data", void 0);
//# sourceMappingURL=bulk-update-units.dto.js.map