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
exports.FindOneEssayDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const exist_entity_decorator_1 = require("../../../common/decorators/exist-entity.decorator");
let FindOneEssayDto = class FindOneEssayDto {
};
exports.FindOneEssayDto = FindOneEssayDto;
__decorate([
    (0, exist_entity_decorator_1.ExistEntity)('essay'),
    (0, swagger_1.ApiProperty)({
        description: 'ID of essay',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid',
    }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindOneEssayDto.prototype, "id", void 0);
exports.FindOneEssayDto = FindOneEssayDto = __decorate([
    (0, graphql_1.InputType)()
], FindOneEssayDto);
//# sourceMappingURL=find-one-essay.dto.js.map