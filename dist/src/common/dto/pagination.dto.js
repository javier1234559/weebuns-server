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
exports.PaginationOutputDto = exports.PaginationInputDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let PaginationInputDto = class PaginationInputDto {
    constructor() {
        this.page = 1;
        this.perPage = 10;
    }
};
exports.PaginationInputDto = PaginationInputDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value) || 1),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        default: 1,
        type: Number,
    }),
    __metadata("design:type", Number)
], PaginationInputDto.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value) || 10),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        default: 10,
        type: Number,
    }),
    __metadata("design:type", Number)
], PaginationInputDto.prototype, "perPage", void 0);
exports.PaginationInputDto = PaginationInputDto = __decorate([
    (0, graphql_1.InputType)()
], PaginationInputDto);
let PaginationOutputDto = class PaginationOutputDto {
};
exports.PaginationOutputDto = PaginationOutputDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Total number of items' }),
    __metadata("design:type", Number)
], PaginationOutputDto.prototype, "totalItems", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Current page number' }),
    __metadata("design:type", Number)
], PaginationOutputDto.prototype, "currentPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Total number of pages' }),
    __metadata("design:type", Number)
], PaginationOutputDto.prototype, "totalPages", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Number of items per page' }),
    __metadata("design:type", Number)
], PaginationOutputDto.prototype, "itemsPerPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indicates if there is a next page',
    }),
    __metadata("design:type", Boolean)
], PaginationOutputDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Indicates if there is a previous page',
    }),
    __metadata("design:type", Boolean)
], PaginationOutputDto.prototype, "hasPreviousPage", void 0);
exports.PaginationOutputDto = PaginationOutputDto = __decorate([
    (0, graphql_1.ObjectType)()
], PaginationOutputDto);
//# sourceMappingURL=pagination.dto.js.map