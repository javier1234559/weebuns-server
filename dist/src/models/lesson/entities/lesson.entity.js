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
exports.Lesson = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
const lesson_comment_entity_1 = require("../../lesson-comment/entities/lesson-comment.entity");
const note_entity_1 = require("../../note/entities/note.entity");
const unit_entity_1 = require("../../unit/entities/unit.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class Lesson {
}
exports.Lesson = Lesson;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        default: 0,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "lessonWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        default: () => 'uuid()',
    }),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Lesson.prototype, "unitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => Object,
    }),
    __metadata("design:type", Object)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'integer',
        format: 'int32',
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.ContentStatus,
    }),
    __metadata("design:type", String)
], Lesson.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Lesson.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Lesson.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Lesson.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => unit_entity_1.Unit,
        required: false,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], Lesson.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Lesson.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => note_entity_1.Note,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => lesson_comment_entity_1.LessonComment,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_progress_entity_1.CourseProgress,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "currentInProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_progress_entity_1.CourseProgress,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Lesson.prototype, "nextInProgress", void 0);
//# sourceMappingURL=lesson.entity.js.map