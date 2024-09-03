import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
      return undefined;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('Token extracted from header:', token);

    if (!token) throw new UnauthorizedException('No token provided.');

    const payload: IAuthPayload = await this.jwtService.verify(token);
    console.log('Token verified:', JSON.stringify(payload));
    try {
      request.user = payload;

      //update last login time
      this.prisma.user.update({
        where: { id: payload.sub },
        data: { last_login: new Date() },
      });

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token provided.');
    }

    // use with cookies approach
    // https://docs.starton.com/tutorials/jwt-authentication-nest
    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //   try {
    //     // Try to retrieve the JWT from request's cookies
    //     //--------------------------------------------------------------------------
    //     const request: Request = context.switchToHttp().getRequest();

    //     const token: string = request.cookies['jwt'];
    //     if (!token) throw new UnauthorizedException();

    //     // Verify the JWT and check if it has been revoked
    //     //--------------------------------------------------------------------------
    //     const payload: JwtPayload = await this.jwtService.verifyAsync(
    //       request.cookies['jwt'],
    //       { secret: process.env.JWT_SECRET },
    //     );

    //     if (
    //       await this.prisma.revokedToken.findUnique({
    //         where: { jti: payload.jti },
    //       })
    //     )
    //       throw new UnauthorizedException();

    //     // Attach user's data to the request
    //     //--------------------------------------------------------------------------
    //     request.user = payload;

    //     return true;
    //   } catch (err: unknown) {
    //     throw new UnauthorizedException();
    //   }
    // }
  }
}
