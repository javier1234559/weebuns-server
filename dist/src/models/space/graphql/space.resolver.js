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
exports.SpaceResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const get_user_space_dto_1 = require("../dto/get-user-space.dto");
const spaces_response_dto_1 = require("../dto/spaces-response.dto");
const space_entity_1 = require("../entities/space.entity");
const space_service_1 = require("../space.service");
let SpaceResolver = class SpaceResolver {
    constructor(spaceService) {
        this.spaceService = spaceService;
    }
    async getUserSpaces(input) {
        return this.spaceService.findUserSpaces(input);
    }
};
exports.SpaceResolver = SpaceResolver;
__decorate([
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, graphql_1.Query)(() => spaces_response_dto_1.SpacesResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_space_dto_1.GetUserSpacesDto]),
    __metadata("design:returntype", Promise)
], SpaceResolver.prototype, "getUserSpaces", null);
exports.SpaceResolver = SpaceResolver = __decorate([
    (0, graphql_1.Resolver)(() => space_entity_1.Space),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [space_service_1.SpaceService])
], SpaceResolver);
//# sourceMappingURL=space.resolver.js.map