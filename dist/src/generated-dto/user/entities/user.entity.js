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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const correction_credit_entity_1 = require("../../correction-credit/entities/correction-credit.entity");
const correction_reply_entity_1 = require("../../correction-reply/entities/correction-reply.entity");
const correction_entity_1 = require("../../correction/entities/correction.entity");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
const course_entity_1 = require("../../course/entities/course.entity");
const essay_entity_1 = require("../../essay/entities/essay.entity");
const lesson_comment_entity_1 = require("../../lesson-comment/entities/lesson-comment.entity");
const lesson_entity_1 = require("../../lesson/entities/lesson.entity");
const note_entity_1 = require("../../note/entities/note.entity");
const space_entity_1 = require("../../space/entities/space.entity");
const subscription_entity_1 = require("../../subscription/entities/subscription.entity");
const unit_entity_1 = require("../../unit/entities/unit.entity");
const vocabulary_entity_1 = require("../../vocabulary/entities/vocabulary.entity");
class User {
}
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.UserRole,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.AuthProvider,
    }),
    __metadata("design:type", String)
], User.prototype, "authProvider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "authProviderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], User.prototype, "nativeLanguage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => space_entity_1.Space,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "spaces", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_entity_1.Course,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => unit_entity_1.Unit,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "units", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => lesson_entity_1.Lesson,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "lessons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_progress_entity_1.CourseProgress,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "courseProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => note_entity_1.Note,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => vocabulary_entity_1.Vocabulary,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "vocabularies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => essay_entity_1.Essay,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "essays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => correction_entity_1.Correction,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "corrections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => correction_reply_entity_1.CorrectionReply,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "correctionReplies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => lesson_comment_entity_1.LessonComment,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "lessonComments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => subscription_entity_1.Subscription,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "subscriptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => correction_credit_entity_1.CorrectionCredit,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "correctionCredits", void 0);
//# sourceMappingURL=user.entity.js.map