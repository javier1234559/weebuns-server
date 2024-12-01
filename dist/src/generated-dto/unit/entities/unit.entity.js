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
exports.Unit = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
const course_entity_1 = require("../../course/entities/course.entity");
const lesson_entity_1 = require("../../lesson/entities/lesson.entity");
const note_entity_1 = require("../../note/entities/note.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class Unit {
}
exports.Unit = Unit;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Unit.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Unit.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Unit.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'integer',
        format: 'int32',
    }),
    __metadata("design:type", Number)
], Unit.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], Unit.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Unit.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Unit.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Unit.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_entity_1.Course,
        required: false,
    }),
    __metadata("design:type", course_entity_1.Course)
], Unit.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Unit.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => lesson_entity_1.Lesson,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Unit.prototype, "lessons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_progress_entity_1.CourseProgress,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Unit.prototype, "courseProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_progress_entity_1.CourseProgress,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Unit.prototype, "nextUnits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => note_entity_1.Note,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Unit.prototype, "Note", void 0);
//# sourceMappingURL=unit.entity.js.map