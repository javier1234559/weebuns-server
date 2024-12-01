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
exports.FindOneEssayResponseDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const essay_entity_1 = require("../entities/essay.entity");
let FindOneEssayResponseDto = class FindOneEssayResponseDto {
};
exports.FindOneEssayResponseDto = FindOneEssayResponseDto;
__decorate([
    (0, graphql_1.Field)(() => essay_entity_1.Essay),
    (0, swagger_1.ApiProperty)({ type: essay_entity_1.Essay }),
    __metadata("design:type", essay_entity_1.Essay)
], FindOneEssayResponseDto.prototype, "essay", void 0);
exports.FindOneEssayResponseDto = FindOneEssayResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], FindOneEssayResponseDto);
//# sourceMappingURL=find-one-essay-reponse.dto.js.map