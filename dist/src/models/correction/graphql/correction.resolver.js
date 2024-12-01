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
exports.CorrectionResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const transaction_client_decorator_1 = require("../../../common/decorators/transaction-client.decorator");
const transaction_interceptor_1 = require("../../../common/interceptor/transaction.interceptor");
const correction_service_1 = require("../correction.service");
const correction_all_response_dto_copy_1 = require("../dto/correction-all-response.dto copy");
const correction_one_response_dto_1 = require("../dto/correction-one-response.dto");
const create_correction_dto_1 = require("../dto/create-correction.dto");
const get_correction_by_essay_dto_1 = require("../dto/get-correction-by-essay.dto");
const update_correction_dto_1 = require("../dto/update-correction.dto");
const correction_entity_1 = require("../entities/correction.entity");
let CorrectionResolver = class CorrectionResolver {
    constructor(correctService) {
        this.correctService = correctService;
    }
    async getCorrectionsByEssay(input) {
        return this.correctService.getAllByEssay(input);
    }
    async getCorrectionIfExist(currentUser, essayId) {
        return this.correctService.getByUserId(String(currentUser.sub), essayId);
    }
    async createCorrectionEssay(transaction, currentUser, input) {
        return this.correctService.create(transaction, String(currentUser.sub), input);
    }
    async updateCorrectionEssay(transaction, currentUser, input) {
        return this.correctService.update(transaction, String(currentUser.sub), input);
    }
};
exports.CorrectionResolver = CorrectionResolver;
__decorate([
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, graphql_1.Query)(() => correction_all_response_dto_copy_1.CorrectionResponseAllDto, { nullable: true }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_correction_by_essay_dto_1.GetCorrectionsByEssayDto]),
    __metadata("design:returntype", Promise)
], CorrectionResolver.prototype, "getCorrectionsByEssay", null);
__decorate([
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, graphql_1.Query)(() => correction_one_response_dto_1.CorrectionResponseOneDto, { nullable: true }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('essayId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CorrectionResolver.prototype, "getCorrectionIfExist", null);
__decorate([
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, transaction_interceptor_1.UseTransaction)(),
    (0, graphql_1.Mutation)(() => correction_one_response_dto_1.CorrectionResponseOneDto),
    __param(0, (0, transaction_client_decorator_1.TransactionClient)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_correction_dto_1.CreateCorrectionDto]),
    __metadata("design:returntype", Promise)
], CorrectionResolver.prototype, "createCorrectionEssay", null);
__decorate([
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, transaction_interceptor_1.UseTransaction)(),
    (0, graphql_1.Mutation)(() => correction_one_response_dto_1.CorrectionResponseOneDto),
    __param(0, (0, transaction_client_decorator_1.TransactionClient)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_correction_dto_1.UpdateCorrectionDto]),
    __metadata("design:returntype", Promise)
], CorrectionResolver.prototype, "updateCorrectionEssay", null);
exports.CorrectionResolver = CorrectionResolver = __decorate([
    (0, graphql_1.Resolver)(() => correction_entity_1.Correction),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [correction_service_1.CorrectionService])
], CorrectionResolver);
//# sourceMappingURL=correction.resolver.js.map