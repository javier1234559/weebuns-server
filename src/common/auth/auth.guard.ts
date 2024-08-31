import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { logger } from 'src/common/utils/logger';

// extend Request type to include headers
export type IAuthRequest = Request & {
  headers: { authorization: string };
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractTokenFromHeader(request: IAuthRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    logger.info('Token extracted from header:', token);

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      logger.info('Token verified:', JSON.stringify(payload));
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token provided.');
    }
  }
}
