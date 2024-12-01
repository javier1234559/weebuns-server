"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    let user;
    if (context.getType() === 'http') {
        const request = context.switchToHttp().getRequest();
        user = request.user;
    }
    else {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        user = ctx.getContext().req.user;
    }
    if (!user) {
        throw new common_1.UnauthorizedException('User not found in request');
    }
    return data ? user?.[data] : user;
});
//# sourceMappingURL=current-user.decorator.js.map