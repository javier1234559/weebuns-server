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
exports.ExistInDbByConstraint = void 0;
exports.ExistInDbBy = ExistInDbBy;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../prisma/prisma.service");
let ExistInDbByConstraint = class ExistInDbByConstraint {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validate(value, args) {
        const [property] = args.constraints;
        const { model: modelName, where } = property;
        const repository = this.prisma[modelName];
        const processedWhere = this.processWhereConditions(where, value);
        try {
            const entity = await repository.findFirst({ where: processedWhere });
            return !!entity;
        }
        catch {
            return false;
        }
    }
    processWhereConditions(where, value) {
        return Object.entries(where).reduce((acc, [key, val]) => {
            acc[key] = val === '$value' ? value : val;
            return acc;
        }, {});
    }
    defaultMessage(args) {
        const [property] = args.constraints;
        const { model: modelName, where } = property;
        const conditions = Object.entries(where)
            .map(([key, val]) => `${key}: ${val === '$value' ? args.value : val}`)
            .join(', ');
        return `${modelName} not found with ${conditions}`;
    }
};
exports.ExistInDbByConstraint = ExistInDbByConstraint;
exports.ExistInDbByConstraint = ExistInDbByConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'existInDbBy', async: true }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExistInDbByConstraint);
function ExistInDbBy(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [options],
            validator: ExistInDbByConstraint,
        });
    };
}
//# sourceMappingURL=exist-in-db-by.decorator.js.map