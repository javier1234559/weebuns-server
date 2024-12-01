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
exports.TransactionInterceptor = exports.UseTransaction = exports.TRANSACTION_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../prisma/prisma.service");
exports.TRANSACTION_KEY = 'useTransaction';
const UseTransaction = () => (0, common_1.SetMetadata)(exports.TRANSACTION_KEY, true);
exports.UseTransaction = UseTransaction;
let TransactionInterceptor = class TransactionInterceptor {
    constructor(prisma, reflector) {
        this.prisma = prisma;
        this.reflector = reflector;
    }
    async intercept(context, next) {
        const shouldUseTransaction = this.reflector.get(exports.TRANSACTION_KEY, context.getHandler());
        if (!shouldUseTransaction) {
            return next.handle();
        }
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                if (context.getType() === 'http') {
                    const request = context.switchToHttp().getRequest();
                    request.prismaTransaction = tx;
                }
                else {
                    const gqlContext = graphql_1.GqlExecutionContext.create(context);
                    const ctx = gqlContext.getContext();
                    ctx.prismaTransaction = tx;
                }
                return await next.handle().toPromise();
            }, {
                maxWait: 5000,
                timeout: 10000,
                isolationLevel: client_1.Prisma.TransactionIsolationLevel.ReadCommitted,
            });
            return (0, rxjs_1.from)([result]);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2024':
                        throw new common_1.InternalServerErrorException('Operation timed out. Please try again.');
                    case 'P2034':
                        throw new common_1.InternalServerErrorException('Transaction failed. Please try again.');
                    default:
                        throw new common_1.InternalServerErrorException(`Database error: ${error.message}`);
                }
            }
            throw error;
        }
    }
};
exports.TransactionInterceptor = TransactionInterceptor;
exports.TransactionInterceptor = TransactionInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        core_1.Reflector])
], TransactionInterceptor);
//# sourceMappingURL=transaction.interceptor.js.map