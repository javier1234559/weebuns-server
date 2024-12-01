"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const space_resolver_1 = require("./graphql/space.resolver");
const space_controller_1 = require("./restful/space.controller");
const space_service_1 = require("./space.service");
let SpaceModule = class SpaceModule {
};
exports.SpaceModule = SpaceModule;
exports.SpaceModule = SpaceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [space_service_1.SpaceService, space_resolver_1.SpaceResolver],
        exports: [space_service_1.SpaceService],
        controllers: [space_controller_1.SpaceController],
    })
], SpaceModule);
//# sourceMappingURL=space.module.js.map