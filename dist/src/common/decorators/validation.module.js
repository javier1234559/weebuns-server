"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationModule = void 0;
const common_1 = require("@nestjs/common");
const exist_entities_decorator_1 = require("./exist-entities.decorator");
const exist_entity_decorator_1 = require("./exist-entity.decorator");
const exist_in_db_by_decorator_1 = require("./exist-in-db-by.decorator");
const exist_in_db_decorator_1 = require("./exist-in-db.decorator");
const prisma_module_1 = require("../prisma/prisma.module");
let ValidationModule = class ValidationModule {
};
exports.ValidationModule = ValidationModule;
exports.ValidationModule = ValidationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [
            exist_entity_decorator_1.ExistEntityConstraint,
            exist_entities_decorator_1.ExistEntitiesConstraint,
            exist_in_db_by_decorator_1.ExistInDbByConstraint,
            exist_in_db_decorator_1.ExistInDbConstraint,
        ],
        exports: [
            exist_entity_decorator_1.ExistEntityConstraint,
            exist_entities_decorator_1.ExistEntitiesConstraint,
            exist_in_db_by_decorator_1.ExistInDbByConstraint,
            exist_in_db_decorator_1.ExistInDbConstraint,
        ],
    })
], ValidationModule);
//# sourceMappingURL=validation.module.js.map