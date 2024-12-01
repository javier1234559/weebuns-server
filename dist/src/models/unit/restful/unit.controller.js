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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../common/auth/auth.guard");
const role_guard_1 = require("../../../common/auth/role.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const create_lesson_dto_1 = require("../../lesson/dto/create-lesson.dto");
const lesson_response_dto_1 = require("../../lesson/dto/lesson-response.dto");
const update_lesson_dto_1 = require("../../lesson/dto/update-lesson.dto");
const lesson_service_1 = require("../../lesson/lesson.service");
const find_one_note_response_dto_1 = require("../../note/dto/find-one-note-response.dto");
const note_service_1 = require("../../note/note.service");
const bulk_update_units_dto_1 = require("../dto/bulk-update-units.dto");
const create_unit_dto_1 = require("../dto/create-unit.dto");
const get_unit_response_dto_1 = require("../dto/get-unit-response.dto");
const unit_learn_dto_1 = require("../dto/unit-learn.dto");
const update_unit_dto_1 = require("../dto/update-unit.dto");
const unit_service_1 = require("../unit.service");
let UnitController = class UnitController {
    constructor(unitService, noteService, lessonService) {
        this.unitService = unitService;
        this.noteService = noteService;
        this.lessonService = lessonService;
    }
    async createUnit(createUnitDto, user) {
        const userId = user.sub.toString();
        return this.unitService.create(createUnitDto, userId);
    }
    async getUnit(unitId) {
        return this.unitService.getUnit(unitId);
    }
    async learnUnit(unitId) {
        return this.unitService.getUnitForLearning(unitId);
    }
    async learnLesson(id, lessonId) {
        return this.lessonService.lessonLearn(id, lessonId);
    }
    async deleteUnit(unitId) {
        return this.unitService.delete(unitId);
    }
    async bulkUpdateUnits(bulkUpdateDto) {
        return this.unitService.bulkUpdate(bulkUpdateDto);
    }
    async updateUnit(unitId, updateUnitDto) {
        return this.unitService.update(unitId, updateUnitDto);
    }
    async getLessonNote(unitId, lessonId) {
        return this.noteService.findOneByLessonId(lessonId);
    }
    async getLesson(unitId, lessonId) {
        return this.lessonService.findOneAndCheck(unitId, lessonId);
    }
    async createLesson(unitId, user, createLessonDto) {
        const userId = String(user.sub);
        return this.lessonService.create(unitId, createLessonDto, userId);
    }
    async updateLesson(unitId, lessonId, updateLessonDto) {
        return this.lessonService.update(unitId, lessonId, updateLessonDto);
    }
    async deleteLesson(unitId, lessonId) {
        return this.lessonService.delete(unitId, lessonId);
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Post)(),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: get_unit_response_dto_1.GetUnitResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unit_dto_1.CreateUnitDto, Object]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "createUnit", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: get_unit_response_dto_1.GetUnitResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "getUnit", null);
__decorate([
    (0, common_1.Get)(':id/learn'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: unit_learn_dto_1.UnitLearnResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "learnUnit", null);
__decorate([
    (0, common_1.Get)(':id/lessons/:lessonId/learn'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: lesson_response_dto_1.LessonResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "learnLesson", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "deleteUnit", null);
__decorate([
    (0, common_1.Put)('bulk-update'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: [bulk_update_units_dto_1.BulkUpdateUnitsResponseDto],
        description: 'Bulk update units including reordering',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_update_units_dto_1.BulkUpdateUnitsDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "bulkUpdateUnits", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: get_unit_response_dto_1.GetUnitResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_unit_dto_1.UpdateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "updateUnit", null);
__decorate([
    (0, common_1.Get)(':id/lessons/:lessonId/note'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: find_one_note_response_dto_1.FindOneNoteResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "getLessonNote", null);
__decorate([
    (0, common_1.Get)(':id/lessons/:lessonId'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER, role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: lesson_response_dto_1.LessonResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "getLesson", null);
__decorate([
    (0, common_1.Post)(':id/lessons'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: lesson_response_dto_1.LessonResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Patch)(':id/lessons/:lessonId'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: lesson_response_dto_1.LessonResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Delete)(':id/lessons/:lessonId'),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.ADMIN),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "deleteLesson", null);
exports.UnitController = UnitController = __decorate([
    (0, swagger_1.ApiTags)('units'),
    (0, common_1.Controller)('units'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [unit_service_1.UnitService,
        note_service_1.NoteService,
        lesson_service_1.LessonService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map