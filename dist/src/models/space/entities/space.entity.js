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
exports.Space = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../common/enum/common");
const user_entity_1 = require("../../user/entities/user.entity");
(0, graphql_1.registerEnumType)(common_1.TargetCode, {
    name: 'TargetCode',
    description: 'Learning target codes',
});
(0, graphql_1.registerEnumType)(common_1.TopicCode, {
    name: 'TopicCode',
    description: 'Learning topic codes',
});
(0, graphql_1.registerEnumType)(common_1.LevelCode, {
    name: 'LevelCode',
    description: 'Proficiency level codes',
});
let SpaceCount = class SpaceCount {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], SpaceCount.prototype, "essays", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], SpaceCount.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], SpaceCount.prototype, "vocabularies", void 0);
SpaceCount = __decorate([
    (0, graphql_1.ObjectType)()
], SpaceCount);
let Space = class Space {
};
exports.Space = Space;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], Space.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'English Learning Space' }),
    __metadata("design:type", String)
], Space.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'A space for learning English',
        nullable: true,
    }),
    __metadata("design:type", String)
], Space.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.LanguageCode),
    (0, swagger_1.ApiProperty)({
        enum: common_1.LanguageCode,
        example: common_1.LanguageCode.ENGLISH,
        description: 'Learning language',
    }),
    __metadata("design:type", String)
], Space.prototype, "language", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.TargetCode),
    (0, swagger_1.ApiProperty)({
        enum: common_1.TargetCode,
        example: common_1.TargetCode.COMMUNICATION,
        description: 'Learning target/purpose',
    }),
    __metadata("design:type", String)
], Space.prototype, "target", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.LevelCode),
    (0, swagger_1.ApiProperty)({
        enum: common_1.LevelCode,
        example: common_1.LevelCode.INTERMEDIATE,
        description: 'Current proficiency level',
    }),
    __metadata("design:type", String)
], Space.prototype, "currentLevel", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.TopicCode),
    (0, swagger_1.ApiProperty)({
        type: 'string',
        isArray: true,
        example: [common_1.TopicCode.ACADEMIC, common_1.TopicCode.DAILY_LIFE],
        description: 'Main learning topic',
    }),
    __metadata("design:type", Array)
], Space.prototype, "topics", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_1.LevelCode),
    (0, swagger_1.ApiProperty)({
        enum: common_1.LevelCode,
        example: common_1.LevelCode.ADVANCED,
        description: 'Target proficiency level to achieve',
    }),
    __metadata("design:type", String)
], Space.prototype, "targetLevel", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, swagger_1.ApiProperty)({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID of the user who created this space',
    }),
    __metadata("design:type", String)
], Space.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    __metadata("design:type", Date)
], Space.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp' }),
    __metadata("design:type", Date)
], Space.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Space.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => SpaceCount, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        type: SpaceCount,
        description: 'Count of related entities',
        example: {
            essays: 0,
            notes: 0,
            vocabularies: 0,
        },
    }),
    __metadata("design:type", SpaceCount)
], Space.prototype, "_count", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        description: 'Creator user details',
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Space.prototype, "creator", void 0);
exports.Space = Space = __decorate([
    (0, graphql_1.ObjectType)()
], Space);
//# sourceMappingURL=space.entity.js.map