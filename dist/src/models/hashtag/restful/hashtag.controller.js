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
exports.HashtagController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const delete_hashtag_response_dto_1 = require("../dto/delete-hashtag-response.dto");
const find_all_hashtags_dto_1 = require("../dto/find-all-hashtags.dto");
const hashtags_response_dto_1 = require("../dto/hashtags-response.dto");
const hashtag_service_1 = require("../hashtag.service");
let HashtagController = class HashtagController {
    constructor(hashtagService) {
        this.hashtagService = hashtagService;
    }
    async findAll(query) {
        return this.hashtagService.findAll(query);
    }
    async deleteByName(name) {
        return this.hashtagService.deleteByName(name);
    }
};
exports.HashtagController = HashtagController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: hashtags_response_dto_1.HashtagsResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_hashtags_dto_1.FindAllHashtagsDto]),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':name'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiParam)({ name: 'name', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: delete_hashtag_response_dto_1.DeleteHashtagResponseDto }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HashtagController.prototype, "deleteByName", null);
exports.HashtagController = HashtagController = __decorate([
    (0, common_1.Controller)('hashtags'),
    (0, swagger_1.ApiTags)('hashtags'),
    __metadata("design:paramtypes", [hashtag_service_1.HashtagService])
], HashtagController);
//# sourceMappingURL=hashtag.controller.js.map