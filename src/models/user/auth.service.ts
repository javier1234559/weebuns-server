import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthProvider } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRole } from 'src/common/type';
import { generateRandomNumber } from 'src/common/utils/random';
import { LoginGoogleDto } from 'src/models/user/dtos/login-google.dto';
import { LoginDto } from 'src/models/user/dtos/login.dto';
import { RegisterDto } from 'src/models/user/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getCurrentUser(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  private async verifyGoogleToken(token: string): Promise<any> {
    // TODO: Implement Google token verification
    // This is a placeholder. You need to implement actual Google token verification.
    // You might want to use the google-auth-library for this.
    throw new Error('Google token verification not implemented');
  }

  private generateToken(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.auth_provider !== AuthProvider.local) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('The password is incorrect');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash: _, ...result } = user;
    const token = this.generateToken(result);
    console.log(token);
    return token;
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password, firstName, lastName } = registerDto;

    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          id: generateRandomNumber(1, 100),
          username,
          email,
          password_hash: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          role: UserRole.USER,
          auth_provider: AuthProvider.local,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash: _, ...user } = newUser;
      return this.generateToken(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong when creating the user',
      );
    }
  }

  registerWithGoogle(registerDto: RegisterDto) {
    throw new Error('Method not implemented.');
  }

  loginGoogle(loginGoogleDto: LoginGoogleDto) {
    throw new Error('Method not implemented.');
  }
}
