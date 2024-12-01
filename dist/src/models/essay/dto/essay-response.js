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
exports.EssaysResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const essay_entity_1 = require("../entities/essay.entity");
let EssaysResponse = class EssaysResponse {
};
exports.EssaysResponse = EssaysResponse;
__decorate([
    (0, graphql_1.Field)(() => [essay_entity_1.Essay]),
    (0, swagger_1.ApiProperty)({ type: [essay_entity_1.Essay] }),
    __metadata("design:type", Array)
], EssaysResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => pagination_dto_1.PaginationOutputDto),
    (0, swagger_1.ApiProperty)({ type: pagination_dto_1.PaginationOutputDto }),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], EssaysResponse.prototype, "pagination", void 0);
exports.EssaysResponse = EssaysResponse = __decorate([
    (0, graphql_1.ObjectType)()
], EssaysResponse);
//# sourceMappingURL=essay-response.js.map