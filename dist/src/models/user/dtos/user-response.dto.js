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
exports.DeleteUserResponse = exports.UpdateUserResponse = exports.CreateUserResponse = exports.UsersResponse = exports.UserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const user_entity_1 = require("../entities/user.entity");
class UserResponse {
}
exports.UserResponse = UserResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], UserResponse.prototype, "user", void 0);
class UsersResponse {
}
exports.UsersResponse = UsersResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [user_entity_1.User] }),
    __metadata("design:type", Array)
], UsersResponse.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)({ type: pagination_dto_1.PaginationOutputDto }),
    __metadata("design:type", pagination_dto_1.PaginationOutputDto)
], UsersResponse.prototype, "pagination", void 0);
class CreateUserResponse {
}
exports.CreateUserResponse = CreateUserResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)({ type: user_entity_1.User }),
    __metadata("design:type", Object)
], CreateUserResponse.prototype, "user", void 0);
class UpdateUserResponse {
}
exports.UpdateUserResponse = UpdateUserResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)({ type: user_entity_1.User }),
    __metadata("design:type", Object)
], UpdateUserResponse.prototype, "user", void 0);
class DeleteUserResponse {
}
exports.DeleteUserResponse = DeleteUserResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)({ type: user_entity_1.User }),
    __metadata("design:type", Object)
], DeleteUserResponse.prototype, "user", void 0);
//# sourceMappingURL=user-response.dto.js.map