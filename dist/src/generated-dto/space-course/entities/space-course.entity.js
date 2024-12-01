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
exports.SpaceCourse = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_entity_1 = require("../../course/entities/course.entity");
const space_entity_1 = require("../../space/entities/space.entity");
class SpaceCourse {
}
exports.SpaceCourse = SpaceCourse;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], SpaceCourse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], SpaceCourse.prototype, "spaceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
    }),
    __metadata("design:type", String)
], SpaceCourse.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], SpaceCourse.prototype, "joinedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => space_entity_1.Space,
        required: false,
    }),
    __metadata("design:type", space_entity_1.Space)
], SpaceCourse.prototype, "space", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_entity_1.Course,
        required: false,
    }),
    __metadata("design:type", course_entity_1.Course)
], SpaceCourse.prototype, "course", void 0);
//# sourceMappingURL=space-course.entity.js.map