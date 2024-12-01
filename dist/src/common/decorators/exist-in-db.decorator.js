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
exports.ExistInDbConstraint = void 0;
exports.ExistInDb = ExistInDb;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../prisma/prisma.service");
let ExistInDbConstraint = class ExistInDbConstraint {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validate(value, args) {
        const [property] = args.constraints;
        const { model: modelName, field = 'id' } = property;
        const repository = this.prisma[modelName];
        const where = { [field]: value };
        try {
            const entity = await repository.findUnique({ where });
            return !!entity;
        }
        catch {
            return false;
        }
    }
    defaultMessage(args) {
        const [property] = args.constraints;
        const { model: modelName, field = 'id' } = property;
        return `${modelName} with ${field} '${args.value}' not found`;
    }
};
exports.ExistInDbConstraint = ExistInDbConstraint;
exports.ExistInDbConstraint = ExistInDbConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'existInDb', async: true }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExistInDbConstraint);
function ExistInDb(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [options],
            validator: ExistInDbConstraint,
        });
    };
}
//# sourceMappingURL=exist-in-db.decorator.js.map