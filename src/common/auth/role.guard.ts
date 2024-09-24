import { SetMetadata } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserRole } from 'src/common/type/enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log(requiredRoles);

    let user;
    if (context.getType() === 'http') {
      // REST request
      const request = context.switchToHttp().getRequest();
      user = request.user;
    } else {
      // GraphQL request
      const ctx = GqlExecutionContext.create(context);
      user = ctx.getContext().req.user;
    }

    if (!user) {
      return false;
    }

    return this.matchRoles(requiredRoles, user.role);
  }

  private matchRoles(requiredRoles: UserRole[], userRole: UserRole): boolean {
    return requiredRoles.includes(userRole);
  }
}

// Example usage in a controller
// @UseGuards(RolesGuard)
// @Roles(UserRole.ADMIN)
// @Post()
// async create(@Body() createCatDto: CreateCatDto) {
//   return 'This action adds a new cat';
// }
