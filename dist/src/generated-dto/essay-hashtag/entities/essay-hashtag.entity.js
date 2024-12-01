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
exports.EssayHashtag = void 0;
const swagger_1 = require("@nestjs/swagger");
const essay_entity_1 = require("../../essay/entities/essay.entity");
const hashtag_entity_1 = require("../../hashtag/entities/hashtag.entity");
class EssayHashtag {
}
exports.EssayHashtag = EssayHashtag;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], EssayHashtag.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], EssayHashtag.prototype, "essayId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], EssayHashtag.prototype, "hashtagId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], EssayHashtag.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => essay_entity_1.Essay,
        required: false,
    }),
    __metadata("design:type", essay_entity_1.Essay)
], EssayHashtag.prototype, "essay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => hashtag_entity_1.Hashtag,
        required: false,
    }),
    __metadata("design:type", hashtag_entity_1.Hashtag)
], EssayHashtag.prototype, "hashtag", void 0);
//# sourceMappingURL=essay-hashtag.entity.js.map