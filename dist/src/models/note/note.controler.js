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
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/auth/auth.guard");
const role_guard_1 = require("../../common/auth/role.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const create_note_dto_1 = require("./dto/create-note.dto");
const find_all_note_response_dto_1 = require("./dto/find-all-note-response.dto");
const find_all_notes_dto_1 = require("./dto/find-all-notes.dto");
const find_one_note_response_dto_1 = require("./dto/find-one-note-response.dto");
const update_note_dto_1 = require("./dto/update-note.dto");
const note_service_1 = require("./note.service");
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    async create(currentUser, dto) {
        return this.noteService.create(dto, currentUser);
    }
    async createOrUpdate(currentUser, dto) {
        return this.noteService.createOrUpdate(dto, currentUser);
    }
    async findAll(query) {
        return this.noteService.findAll(query);
    }
    async findOne(id) {
        return this.noteService.findOne(id);
    }
    async update(id, dto) {
        return this.noteService.update(id, dto);
    }
    async delete(id) {
        return this.noteService.delete(id);
    }
};
exports.NoteController = NoteController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: find_one_note_response_dto_1.FindOneNoteResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upsert'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: find_one_note_response_dto_1.FindOneNoteResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: find_all_note_response_dto_1.NotesResponse,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_notes_dto_1.FindAllNotesDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: find_one_note_response_dto_1.FindOneNoteResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: find_one_note_response_dto_1.FindOneNoteResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: find_one_note_response_dto_1.FindOneNoteResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "delete", null);
exports.NoteController = NoteController = __decorate([
    (0, common_1.Controller)('notes'),
    (0, swagger_1.ApiTags)('notes'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, role_guard_1.Roles)(role_guard_1.UserRole.USER),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteController);
//# sourceMappingURL=note.controler.js.map