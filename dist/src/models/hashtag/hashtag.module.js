"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashTagModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const hashtag_service_1 = require("./hashtag.service");
const hashtag_controller_1 = require("./restful/hashtag.controller");
let HashTagModule = class HashTagModule {
};
exports.HashTagModule = HashTagModule;
exports.HashTagModule = HashTagModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [hashtag_service_1.HashtagService],
        exports: [hashtag_service_1.HashtagService],
        controllers: [hashtag_controller_1.HashtagController],
    })
], HashTagModule);
//# sourceMappingURL=hashtag.module.js.map