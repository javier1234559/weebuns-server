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
exports.Essay = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const correction_entity_1 = require("../../correction/entities/correction.entity");
const essay_hashtag_entity_1 = require("../../essay-hashtag/entities/essay-hashtag.entity");
const space_entity_1 = require("../../space/entities/space.entity");
const user_entity_1 = require("../../user/entities/user.entity");
(0, graphql_1.registerEnumType)(client_1.ContentStatus, {
    name: 'ContentStatus',
    description: 'Status of the content',
});
let Essay = class Essay {
};
exports.Essay = Essay;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Essay.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", String)
], Essay.prototype, "spaceId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'My First Essay' }),
    __metadata("design:type", String)
], Essay.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], Essay.prototype, "upvoteCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'A brief summary', nullable: true }),
    __metadata("design:type", String)
], Essay.prototype, "summary", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'Essay content...' }),
    __metadata("design:type", String)
], Essay.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/cover.jpg', nullable: true }),
    __metadata("design:type", String)
], Essay.prototype, "coverUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.ContentStatus),
    (0, swagger_1.ApiProperty)({ enum: client_1.ContentStatus, example: client_1.ContentStatus.draft }),
    __metadata("design:type", String)
], Essay.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: 'en' }),
    __metadata("design:type", String)
], Essay.prototype, "language", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", String)
], Essay.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Essay.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Essay.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Date)
], Essay.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => space_entity_1.Space, { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: () => space_entity_1.Space, nullable: true }),
    __metadata("design:type", space_entity_1.Space)
], Essay.prototype, "space", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Essay.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => [correction_entity_1.Correction], { nullable: true }),
    (0, swagger_1.ApiProperty)({ type: () => [correction_entity_1.Correction], nullable: true }),
    __metadata("design:type", Array)
], Essay.prototype, "corrections", void 0);
__decorate([
    (0, graphql_1.Field)(() => [essay_hashtag_entity_1.EssayHashtag], { nullable: true }),
    (0, swagger_1.ApiProperty)({
        type: () => [essay_hashtag_entity_1.EssayHashtag],
        nullable: true,
        description: 'Associated hashtags for this essay',
    }),
    __metadata("design:type", Array)
], Essay.prototype, "hashtags", void 0);
exports.Essay = Essay = __decorate([
    (0, graphql_1.ObjectType)()
], Essay);
//# sourceMappingURL=essay.entity.js.map