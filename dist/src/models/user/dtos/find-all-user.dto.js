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
exports.UsersResponse = exports.FindAllUsersDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const user_entity_1 = require("../entities/user.entity");
let FindAllUsersDto = class FindAllUsersDto extends pagination_dto_1.PaginationInputDto {
};
exports.FindAllUsersDto = FindAllUsersDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAllUsersDto.prototype, "search", void 0);
exports.FindAllUsersDto = FindAllUsersDto = __decorate([
    (0, graphql_1.InputType)()
], FindAllUsersDto);
let UsersResponse = class UsersResponse {
};
exports.UsersResponse = UsersResponse;
__decorate([
    (0, graphql_1.Field)(() => [user_entity_1.User]),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UsersResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => pagination_dto_1.PaginationOutputDto),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], UsersResponse.prototype, "pagination", void 0);
exports.UsersResponse = UsersResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UsersResponse);
//# sourceMappingURL=find-all-user.dto.js.map