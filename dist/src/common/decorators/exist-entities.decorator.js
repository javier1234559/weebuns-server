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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistEntitiesConstraint = void 0;
exports.ExistEntities = ExistEntities;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../prisma/prisma.service");
let ExistEntitiesConstraint = class ExistEntitiesConstraint {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validate(values, args) {
        if (!values?.length)
            return true;
        const [entityName] = args.constraints;
        const entity = this.prisma[entityName];
        if (!entity)
            return false;
        const records = await entity.findMany({
            where: {
                id: { in: values },
            },
        });
        return records.length === values.length;
    }
    defaultMessage(args) {
        const [entityName] = args.constraints;
        return `One or more ${entityName}s do not exist`;
    }
};
exports.ExistEntitiesConstraint = ExistEntitiesConstraint;
exports.ExistEntitiesConstraint = ExistEntitiesConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'existEntities', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExistEntitiesConstraint);
function ExistEntities(entityName, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entityName],
            validator: ExistEntitiesConstraint,
        });
    };
}
//# sourceMappingURL=exist-entities.decorator.js.map