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
exports.SimplifiedNoteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_entity_1 = require("../../course/entities/course.entity");
const lesson_without_content_dto_1 = require("../../lesson/dto/lesson-without-content.dto");
class SimplifiedNoteDto {
}
exports.SimplifiedNoteDto = SimplifiedNoteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], SimplifiedNoteDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', nullable: true }),
    __metadata("design:type", String)
], SimplifiedNoteDto.prototype, "spaceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], SimplifiedNoteDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], SimplifiedNoteDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], SimplifiedNoteDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], SimplifiedNoteDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], SimplifiedNoteDto.prototype, "isBookmarked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => lesson_without_content_dto_1.LessonWithoutContent }),
    __metadata("design:type", lesson_without_content_dto_1.LessonWithoutContent)
], SimplifiedNoteDto.prototype, "lesson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => course_entity_1.Course }),
    __metadata("design:type", course_entity_1.Course)
], SimplifiedNoteDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    __metadata("design:type", Date)
], SimplifiedNoteDto.prototype, "createdAt", void 0);
//# sourceMappingURL=simple-note.dto.js.map