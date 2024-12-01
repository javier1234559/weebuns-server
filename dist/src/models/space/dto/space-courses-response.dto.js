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
exports.SpaceCoursesResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const course_entity_1 = require("../../course/entities/course.entity");
class SpaceCoursesResponseDto {
}
exports.SpaceCoursesResponseDto = SpaceCoursesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [course_entity_1.Course] }),
    __metadata("design:type", Array)
], SpaceCoursesResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: pagination_dto_1.PaginationOutputDto }),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], SpaceCoursesResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=space-courses-response.dto.js.map