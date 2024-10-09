import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { AuthService } from 'src/models/user/auth.service';
import { LoginFacebookDto } from 'src/models/user/dtos/login-facebook.dto';
import { LoginGoogleDto } from 'src/models/user/dtos/login-google.dto';
import { LoginDto } from 'src/models/user/dtos/login.dto';
import { RegisterDto } from 'src/models/user/dtos/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return this.authService.getCurrentUser(req.user);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(registerDto, res);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }

  @Post('login/google')
  async loginWithGoogle(
    @Body() loginDto: LoginGoogleDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.loginGoogle(loginDto, res);
  }

  @Post('login/facebook')
  async loginWithFacebook(
    @Body() loginDto: LoginFacebookDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.loginFacebook(loginDto, res);
  }

  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.refreshToken(refreshToken, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
