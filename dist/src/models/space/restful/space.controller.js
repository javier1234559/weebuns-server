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
exports.SpaceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const course_joined_dto_1 = require("../dto/course-joined.dto");
const create_space_dto_1 = require("../dto/create-space.dto");
const delete_space_response_dto_1 = require("../dto/delete-space-response.dto");
const explore_course_query_dto_1 = require("../dto/explore-course-query.dto");
const find_all_spaces_dto_1 = require("../dto/find-all-spaces.dto");
const find_one_space_response_dto_1 = require("../dto/find-one-space-response.dto");
const get_space_user_dto_1 = require("../dto/get-space-user.dto");
const space_course_all_response_dto_1 = require("../dto/space-course-all-response.dto");
const spaces_response_dto_1 = require("../dto/spaces-response.dto");
const update_space_dto_1 = require("../dto/update-space.dto");
const space_service_1 = require("../space.service");
let SpaceController = class SpaceController {
    constructor(spaceService) {
        this.spaceService = spaceService;
    }
    async findAll(query) {
        return this.spaceService.findAll(query);
    }
    async getUserSpaces(user, query) {
        return this.spaceService.getSpacesUser(user.sub.toString(), query);
    }
    async findOne(id) {
        return this.spaceService.findOne(id);
    }
    async create(user, dto) {
        return this.spaceService.create(dto, user);
    }
    async update(id, dto) {
        return this.spaceService.update(id, dto);
    }
    async delete(id) {
        return this.spaceService.delete(id);
    }
    async getSpaceCoursesJoined(user, spaceId, page = 1, perPage = 10) {
        const userId = String(user.sub);
        const validPage = page > 0 ? page : 1;
        const validPerPage = perPage > 0 ? perPage : 10;
        return this.spaceService.getSpaceCoursesJoined(userId, spaceId, validPage, validPerPage);
    }
    async getSpaceCourses(user, spaceId, query) {
        const userId = String(user.sub);
        return this.spaceService.getSpaceCourses(userId, spaceId, {
            ...query,
            page: query.page > 0 ? query.page : 1,
            perPage: query.perPage > 0 ? query.perPage : 10,
        });
    }
};
exports.SpaceController = SpaceController;
__decorate([
    (0, common_1.Get)(),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: spaces_response_dto_1.SpacesResponse }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_spaces_dto_1.FindAllSpacesDto]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: spaces_response_dto_1.SpacesResponse }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_space_user_dto_1.GetSpacesUserDto]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getUserSpaces", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: find_one_space_response_dto_1.FindOneSpaceResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: find_one_space_response_dto_1.FindOneSpaceResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_space_dto_1.CreateSpaceDto]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: find_one_space_response_dto_1.FindOneSpaceResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_space_dto_1.UpdateSpaceDto]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: delete_space_response_dto_1.DeleteSpaceResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/courses/joined'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: course_joined_dto_1.SpaceCoursesJoinedResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getSpaceCoursesJoined", null);
__decorate([
    (0, common_1.Get)(':id/courses/explore'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: space_course_all_response_dto_1.SpaceCoursesAllResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, explore_course_query_dto_1.ExploreCoursesQueryDto]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "getSpaceCourses", null);
exports.SpaceController = SpaceController = __decorate([
    (0, common_1.Controller)('spaces'),
    (0, swagger_1.ApiTags)('spaces'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [space_service_1.SpaceService])
], SpaceController);
//# sourceMappingURL=space.controller.js.map