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
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const common_1 = require("../../../common/enum/common");
const correction_credit_entity_1 = require("../../correction-credit/entities/correction-credit.entity");
const correction_reply_entity_1 = require("../../correction-reply/entities/correction-reply.entity");
const correction_entity_1 = require("../../correction/entities/correction.entity");
const course_progress_entity_1 = require("../../course-progress/entities/course-progress.entity");
const course_entity_1 = require("../../course/entities/course.entity");
const essay_entity_1 = require("../../essay/entities/essay.entity");
const lesson_comment_entity_1 = require("../../lesson-comment/entities/lesson-comment.entity");
const note_entity_1 = require("../../note/entities/note.entity");
const space_entity_1 = require("../../space/entities/space.entity");
const subscription_entity_1 = require("../../subscription/entities/subscription.entity");
const vocabulary_entity_1 = require("../../vocabulary/entities/vocabulary.entity");
(0, graphql_1.registerEnumType)(client_1.UserRole, {
    name: 'UserRole',
    description: 'User roles in the system',
});
(0, graphql_1.registerEnumType)(client_1.AuthProvider, {
    name: 'AuthProvider',
    description: 'Authentication providers',
});
(0, graphql_1.registerEnumType)(common_1.LanguageCode, {
    name: 'LanguageCode',
    description: 'Available language codes',
});
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)({
        example: '00321d6f-2bcf-4985-9659-92a571275da6',
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'johndoe' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'john@example.com' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.UserRole),
    (0, swagger_1.ApiProperty)({
        enum: client_1.UserRole,
        example: client_1.UserRole.user,
        description: 'User role in the system',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.AuthProvider),
    (0, swagger_1.ApiProperty)({
        enum: client_1.AuthProvider,
        example: client_1.AuthProvider.local,
        description: 'Authentication provider used',
    }),
    __metadata("design:type", String)
], User.prototype, "authProvider", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "authProviderId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'John',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'Doe',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/avatar.jpg',
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({
        example: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.LanguageCode),
    (0, swagger_1.ApiProperty)({
        enum: common_1.LanguageCode,
        example: common_1.LanguageCode.VIETNAMESE,
        description: "User's native language",
    }),
    __metadata("design:type", String)
], User.prototype, "nativeLanguage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Timestamp when the user was deleted (soft delete)',
    }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [course_entity_1.Course],
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [course_progress_entity_1.CourseProgress],
        nullable: true,
        description: 'Progress tracking for enrolled courses',
    }),
    __metadata("design:type", Array)
], User.prototype, "courseProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [note_entity_1.Note],
        nullable: true,
        description: 'Notes created by the user',
    }),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [vocabulary_entity_1.Vocabulary],
        nullable: true,
        description: 'Vocabulary items created by the user',
    }),
    __metadata("design:type", Array)
], User.prototype, "vocabularies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [space_entity_1.Space],
        nullable: true,
        description: 'Learning spaces created by the user',
    }),
    __metadata("design:type", Array)
], User.prototype, "spaces", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [essay_entity_1.Essay],
        nullable: true,
        description: 'Essays written by the user',
    }),
    __metadata("design:type", Array)
], User.prototype, "essays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [correction_entity_1.Correction],
        nullable: true,
        description: 'Corrections made by the user',
    }),
    __metadata("design:type", Array)
], User.prototype, "corrections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [correction_reply_entity_1.CorrectionReply],
        nullable: true,
        description: 'Replies to corrections',
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
        type: () => [subscription_entity_1.Subscription],
        nullable: true,
        description: 'User subscriptions',
    }),
    __metadata("design:type", Array)
], User.prototype, "subscriptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [correction_credit_entity_1.CorrectionCredit],
        nullable: true,
        description: 'Correction credits owned by the user',
    }),
    __metadata("design:type", Array)
], User.prototype, "correctionCredits", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map