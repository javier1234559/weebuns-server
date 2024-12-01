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
exports.Course = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
const space_course_entity_1 = require("../../space-course/entities/space-course.entity");
const unit_entity_1 = require("../../unit/entities/unit.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class Course {
}
exports.Course = Course;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        default: 0,
    }),
    __metadata("design:type", Number)
], Course.prototype, "totalWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        default: () => 'uuid()',
    }),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Course.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Course.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Course.prototype, "minLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Course.prototype, "maxLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        isArray: true,
    }),
    __metadata("design:type", Array)
], Course.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Course.prototype, "courseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Course.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        enum: client_1.ContentStatus,
        default: client_1.ContentStatus.draft,
    }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Course.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Course.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Course.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => unit_entity_1.Unit,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Course.prototype, "units", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_progress_entity_1.CourseProgress,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Course.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => space_course_entity_1.SpaceCourse,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Course.prototype, "spaces", void 0);
//# sourceMappingURL=course.entity.js.map