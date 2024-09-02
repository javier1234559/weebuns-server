import { SetMetadata } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';

import { UserRole } from 'src/common/type';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the required roles from the metadata expected if not have roles then allways return true
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(requiredRoles, user.roles);
  }

  private matchRoles(
    requiredRoles: UserRole[],
    userRoles: UserRole[],
  ): boolean {
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}

// Example usage in a controller
// @UseGuards(RolesGuard)
// @Roles(UserRole.ADMIN)
// @Post()
// async create(@Body() createCatDto: CreateCatDto) {
//   return 'This action adds a new cat';
// }
