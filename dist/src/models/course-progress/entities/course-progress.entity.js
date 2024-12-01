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
exports.CourseProgress = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_entity_1 = require("../../course/entities/course.entity");
const lesson_entity_1 = require("../../lesson/entities/lesson.entity");
const unit_entity_1 = require("../../unit/entities/unit.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class CourseProgress {
}
exports.CourseProgress = CourseProgress;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'integer',
        format: 'int32',
    }),
    __metadata("design:type", Number)
], CourseProgress.prototype, "completedWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseProgress.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseProgress.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], CourseProgress.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], CourseProgress.prototype, "currentUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], CourseProgress.prototype, "currentLessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], CourseProgress.prototype, "nextUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], CourseProgress.prototype, "nextLessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], CourseProgress.prototype, "lastAccessedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        isArray: true,
    }),
    __metadata("design:type", Array)
], CourseProgress.prototype, "completedUnits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        isArray: true,
    }),
    __metadata("design:type", Array)
], CourseProgress.prototype, "completedLessons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], CourseProgress.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_entity_1.Course,
        required: false,
    }),
    __metadata("design:type", course_entity_1.Course)
], CourseProgress.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => unit_entity_1.Unit,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], CourseProgress.prototype, "currentUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => unit_entity_1.Unit,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], CourseProgress.prototype, "nextUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => lesson_entity_1.Lesson,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", lesson_entity_1.Lesson)
], CourseProgress.prototype, "currentLesson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => lesson_entity_1.Lesson,
        required: false,
        nullable: true,
    }),
    __metadata("design:type", lesson_entity_1.Lesson)
], CourseProgress.prototype, "nextLesson", void 0);
//# sourceMappingURL=course-progress.entity.js.map