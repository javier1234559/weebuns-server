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
exports.Hashtag = exports.HashtagCount = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const essay_hashtag_entity_1 = require("../../essay-hashtag/entities/essay-hashtag.entity");
let HashtagCount = class HashtagCount {
};
exports.HashtagCount = HashtagCount;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, swagger_1.ApiProperty)({
        example: 5,
    }),
    __metadata("design:type", Number)
], HashtagCount.prototype, "essays", void 0);
exports.HashtagCount = HashtagCount = __decorate([
    (0, graphql_1.ObjectType)()
], HashtagCount);
let Hashtag = class Hashtag {
};
exports.Hashtag = Hashtag;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", String)
], Hashtag.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({
        example: 'grammar',
    }),
    __metadata("design:type", String)
], Hashtag.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, swagger_1.ApiProperty)({
        example: 10,
    }),
    __metadata("design:type", Number)
], Hashtag.prototype, "usageCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], Hashtag.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, swagger_1.ApiProperty)({
        example: '2024-01-01T00:00:00Z',
    }),
    __metadata("design:type", Date)
], Hashtag.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [essay_hashtag_entity_1.EssayHashtag], { nullable: true }),
    (0, swagger_1.ApiProperty)({
        type: () => [essay_hashtag_entity_1.EssayHashtag],
        nullable: true,
    }),
    __metadata("design:type", Array)
], Hashtag.prototype, "essays", void 0);
__decorate([
    (0, graphql_1.Field)(() => HashtagCount, { nullable: true }),
    (0, swagger_1.ApiProperty)({
        type: HashtagCount,
        nullable: true,
    }),
    __metadata("design:type", HashtagCount)
], Hashtag.prototype, "_count", void 0);
exports.Hashtag = Hashtag = __decorate([
    (0, graphql_1.ObjectType)()
], Hashtag);
//# sourceMappingURL=hashtag.entity.js.map