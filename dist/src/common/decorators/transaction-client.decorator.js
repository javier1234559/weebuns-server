"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionClient = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.TransactionClient = (0, common_1.createParamDecorator)((data, context) => {
    if (context.getType() === 'http') {
        const request = context.switchToHttp().getRequest();
        return request.prismaTransaction;
    }
    else {
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        return ctx.prismaTransaction;
    }
});
//# sourceMappingURL=transaction-client.decorator.js.map