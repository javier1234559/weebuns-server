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
exports.VocabularyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const create_vocabulary_dto_1 = require("../dto/create-vocabulary.dto");
const find_all_vocabulary_dto_1 = require("../dto/find-all-vocabulary.dto");
const find_one_vocabulary_response_dto_1 = require("../dto/find-one-vocabulary-response.dto");
const update_vocabulary_dto_1 = require("../dto/update-vocabulary.dto");
const vocabulary_response_dto_1 = require("../dto/vocabulary-response.dto");
const vocabulary_service_1 = require("../vocabulary.service");
let VocabularyController = class VocabularyController {
    constructor(vocabularyService) {
        this.vocabularyService = vocabularyService;
    }
    async create(currentUser, createVocabularyDto) {
        return this.vocabularyService.create(createVocabularyDto, currentUser);
    }
    async findAll(findAllVocabulariesDto) {
        return this.vocabularyService.findAll(findAllVocabulariesDto);
    }
    async findOne(id) {
        return this.vocabularyService.findOne(id);
    }
    async update(id, updateVocabularyDto) {
        return this.vocabularyService.update(id, updateVocabularyDto);
    }
    async delete(id) {
        return this.vocabularyService.delete(id);
    }
};
exports.VocabularyController = VocabularyController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: find_one_vocabulary_response_dto_1.FindOneVocabularyResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vocabulary_dto_1.CreateVocabularyDto]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: vocabulary_response_dto_1.VocabularyResponse,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_vocabulary_dto_1.FindAllVocabularyDto]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: find_one_vocabulary_response_dto_1.FindOneVocabularyResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: find_one_vocabulary_response_dto_1.FindOneVocabularyResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vocabulary_dto_1.UpdateVocabularyDto]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: find_one_vocabulary_response_dto_1.FindOneVocabularyResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "delete", null);
exports.VocabularyController = VocabularyController = __decorate([
    (0, common_1.Controller)('vocabularies'),
    (0, swagger_1.ApiTags)('vocabularies'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    __metadata("design:paramtypes", [vocabulary_service_1.VocabularyService])
], VocabularyController);
//# sourceMappingURL=vocabulary.controller.js.map