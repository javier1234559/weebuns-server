import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
export declare class AuthGuard implements CanActivate {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private extractTokenFromHeader;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
