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
exports.EssayResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const essay_response_1 = require("../dto/essay-response");
const find_all_essay_dto_1 = require("../dto/find-all-essay.dto");
const essay_entity_1 = require("../entities/essay.entity");
const essay_service_1 = require("../essay.service");
let EssayResolver = class EssayResolver {
    constructor(essayService) {
        this.essayService = essayService;
    }
    async getAllEssays(input) {
        return this.essayService.findAll(input);
    }
    async getUserEssays(user, input) {
        return this.essayService.findAllByUser(input, user);
    }
};
exports.EssayResolver = EssayResolver;
__decorate([
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, graphql_1.Query)(() => essay_response_1.EssaysResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_essay_dto_1.FindAllEssaysDto]),
    __metadata("design:returntype", Promise)
], EssayResolver.prototype, "getAllEssays", null);
__decorate([
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, graphql_1.Query)(() => essay_response_1.EssaysResponse, { nullable: true }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, find_all_essay_dto_1.FindAllEssaysDto]),
    __metadata("design:returntype", Promise)
], EssayResolver.prototype, "getUserEssays", null);
exports.EssayResolver = EssayResolver = __decorate([
    (0, graphql_1.Resolver)(() => essay_entity_1.Essay),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [essay_service_1.EssayService])
], EssayResolver);
//# sourceMappingURL=essay.resolver.js.map