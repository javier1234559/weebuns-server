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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssayController = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const transaction_client_decorator_1 = require("../../../common/decorators/transaction-client.decorator");
const transaction_interceptor_1 = require("../../../common/interceptor/transaction.interceptor");
const create_essay_response_dto_1 = require("../dto/create-essay-response.dto");
const create_essay_dto_1 = require("../dto/create-essay.dto");
const delete_space_response_dto_1 = require("../dto/delete-space-response.dto");
const essay_response_1 = require("../dto/essay-response");
const find_all_essay_dto_1 = require("../dto/find-all-essay.dto");
const find_one_essay_reponse_dto_1 = require("../dto/find-one-essay-reponse.dto");
const find_one_essay_dto_1 = require("../dto/find-one-essay.dto");
const update_essay_dto_1 = require("../dto/update-essay.dto");
const update_space_response_dto_1 = require("../dto/update-space-response.dto");
const essay_service_1 = require("../essay.service");
let EssayController = class EssayController {
    constructor(essayService) {
        this.essayService = essayService;
    }
    async findAll(query) {
        return this.essayService.findAll(query);
    }
    async findAllByUser(user, query) {
        return this.essayService.findAllByUser(query, user);
    }
    async findOne(params) {
        return this.essayService.findOne(params.id);
    }
    async create(user, transaction, dto) {
        return this.essayService.create(transaction, dto, user);
    }
    async update(user, transaction, params, dto) {
        return this.essayService.update(transaction, params.id, dto, user);
    }
    async deleteByUser(params) {
        return this.essayService.deleteByUser(params.id);
    }
    async delete(params) {
        return this.essayService.delete(params.id);
    }
};
exports.EssayController = EssayController;
__decorate([
    (0, common_1.Get)(),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, cache_manager_1.CacheTTL)(300),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: essay_response_1.EssaysResponse }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_essay_dto_1.FindAllEssaysDto]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: essay_response_1.EssaysResponse }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_all_essay_dto_1.FindAllEssaysDto]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: find_one_essay_reponse_dto_1.FindOneEssayResponseDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_one_essay_dto_1.FindOneEssayDto]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, transaction_interceptor_1.UseTransaction)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: create_essay_response_dto_1.CreateEssayResponseDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, transaction_client_decorator_1.TransactionClient)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_essay_dto_1.CreateEssayDto]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, transaction_interceptor_1.UseTransaction)(),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: update_space_response_dto_1.UpdateEssayResponseDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, transaction_client_decorator_1.TransactionClient)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, find_one_essay_dto_1.FindOneEssayDto,
        update_essay_dto_1.UpdateEssayDto]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id/user'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: delete_space_response_dto_1.DeleteEssayResponseDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_one_essay_dto_1.FindOneEssayDto]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "deleteByUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: delete_space_response_dto_1.DeleteEssayResponseDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_one_essay_dto_1.FindOneEssayDto]),
    __metadata("design:returntype", Promise)
], EssayController.prototype, "delete", null);
exports.EssayController = EssayController = __decorate([
    (0, common_1.Controller)('essays'),
    (0, swagger_1.ApiTags)('essays'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __metadata("design:paramtypes", [essay_service_1.EssayService])
], EssayController);
//# sourceMappingURL=essay.controller.js.map