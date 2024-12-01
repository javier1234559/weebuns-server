import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LogoutResponse, UserLoginResponse, UserRefreshTokenResponse, UserRegisterResponse, UserResponse } from 'src/models/user/dtos/auth-response.dto';
import { LoginGoogleDto } from 'src/models/user/dtos/login-google.dto';
import { LoginDto } from 'src/models/user/dtos/login.dto';
import { RegisterDto } from 'src/models/user/dtos/register.dto';
export declare class AuthService {
    private prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private generateTokens;
    getCurrentUser(authPayload: IAuthPayload): Promise<UserResponse>;
    login(loginDto: LoginDto, res: Response): Promise<UserLoginResponse>;
    register(registerDto: RegisterDto, res: Response): Promise<UserRegisterResponse>;
    loginGoogle(loginGoogleDto: LoginGoogleDto, res: Response): Promise<UserLoginResponse>;
    loginFacebook(loginFacebookDto: LoginGoogleDto, res: Response): Promise<UserLoginResponse>;
    private findOrCreateUser;
    private generateAuthResponse;
    refreshToken(refreshToken: string, res: Response): Promise<UserRefreshTokenResponse>;
    private setRefreshTokenCookie;
    logout(res: Response): Promise<LogoutResponse>;
}
