"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssayModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const essay_service_1 = require("./essay.service");
const essay_controller_1 = require("./restful/essay.controller");
const hashtag_service_1 = require("../hashtag/hashtag.service");
let EssayModule = class EssayModule {
};
exports.EssayModule = EssayModule;
exports.EssayModule = EssayModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [essay_service_1.EssayService, hashtag_service_1.HashtagService],
        exports: [essay_service_1.EssayService],
        controllers: [essay_controller_1.EssayController],
    })
], EssayModule);
//# sourceMappingURL=essay.module.js.map