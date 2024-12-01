import { Request, Response } from 'express';
import { AuthService } from 'src/models/user/auth.service';
import { LogoutResponse, UserLoginResponse, UserRefreshTokenResponse, UserRegisterResponse, UserResponse } from 'src/models/user/dtos/auth-response.dto';
import { LoginFacebookDto } from 'src/models/user/dtos/login-facebook.dto';
import { LoginGoogleDto } from 'src/models/user/dtos/login-google.dto';
import { LoginDto } from 'src/models/user/dtos/login.dto';
import { RegisterDto } from 'src/models/user/dtos/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    me(req: Request): Promise<UserResponse>;
    register(registerDto: RegisterDto, res: Response): Promise<UserRegisterResponse>;
    login(loginDto: LoginDto, res: Response): Promise<UserLoginResponse>;
    loginWithGoogle(loginDto: LoginGoogleDto, res: Response): Promise<UserLoginResponse>;
    loginWithFacebook(loginDto: LoginFacebookDto, res: Response): Promise<UserLoginResponse>;
    refreshToken(req: Request, res: Response): Promise<UserRefreshTokenResponse>;
    logout(res: Response): Promise<LogoutResponse>;
}
