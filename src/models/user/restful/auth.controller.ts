import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { AuthService } from 'src/models/user/auth.service';
import { LoginGoogleDto } from 'src/models/user/dtos/login-google.dto';
import { LoginDto } from 'src/models/user/dtos/login.dto';
import { RegisterDto } from 'src/models/user/dtos/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() req) {
    return this.authService.getCurrentUser(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login/google')
  async loginWithGoogle(@Body() loginDto: LoginGoogleDto) {
    return this.authService.loginGoogle(loginDto);
  }
}
