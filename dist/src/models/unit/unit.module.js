"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const lesson_service_1 = require("../lesson/lesson.service");
const note_service_1 = require("../note/note.service");
const unit_controller_1 = require("./restful/unit.controller");
const unit_service_1 = require("./unit.service");
let UnitModule = class UnitModule {
};
exports.UnitModule = UnitModule;
exports.UnitModule = UnitModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [unit_service_1.UnitService, note_service_1.NoteService, lesson_service_1.LessonService],
        exports: [unit_service_1.UnitService, note_service_1.NoteService],
        controllers: [unit_controller_1.UnitController],
    })
], UnitModule);
//# sourceMappingURL=unit.module.js.map