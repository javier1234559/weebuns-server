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
exports.Note = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_entity_1 = require("../../course/entities/course.entity");
const lesson_entity_1 = require("../../lesson/entities/lesson.entity");
const unit_entity_1 = require("../../unit/entities/unit.entity");
const space_entity_1 = require("../../space/entities/space.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class Note {
}
exports.Note = Note;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Note.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Note.prototype, "spaceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Note.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Note.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Note.prototype, "unitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        isArray: true,
    }),
    __metadata("design:type", Array)
], Note.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], Note.prototype, "isBookmarked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Note.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Note.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Note.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => lesson_entity_1.Lesson,
        required: false,
    }),
    __metadata("design:type", lesson_entity_1.Lesson)
], Note.prototype, "lesson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Note.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => space_entity_1.Space,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", space_entity_1.Space)
], Note.prototype, "space", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_entity_1.Course,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", course_entity_1.Course)
], Note.prototype, "Course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => unit_entity_1.Unit,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], Note.prototype, "Unit", void 0);
//# sourceMappingURL=note.entity.js.map