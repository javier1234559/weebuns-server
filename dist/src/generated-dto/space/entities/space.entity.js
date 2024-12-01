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
const swagger_1 = require("@nestjs/swagger");
const essay_entity_1 = require("../../essay/entities/essay.entity");
const note_entity_1 = require("../../note/entities/note.entity");
const space_course_entity_1 = require("../../space-course/entities/space-course.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const vocabulary_entity_1 = require("../../vocabulary/entities/vocabulary.entity");
class Space {
}
exports.Space = Space;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Space.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Space.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
    }),
    __metadata("design:type", String)
], Space.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Space.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Space.prototype, "target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Space.prototype, "currentLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        isArray: true,
    }),
    __metadata("design:type", Array)
], Space.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Space.prototype, "targetLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], Space.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Space.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], Space.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Space.prototype, "deletedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => user_entity_1.User,
        required: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Space.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => essay_entity_1.Essay,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Space.prototype, "essays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => vocabulary_entity_1.Vocabulary,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Space.prototype, "vocabularies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => note_entity_1.Note,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Space.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => space_course_entity_1.SpaceCourse,
        isArray: true,
        required: false,
    }),
    __metadata("design:type", Array)
], Space.prototype, "courses", void 0);
//# sourceMappingURL=space.entity.js.map