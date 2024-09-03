import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthProvider } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRole } from 'src/common/type/enum';
import { generateRandomNumber } from 'src/common/utils/random';
import config from 'src/config';
import { LoginGoogleDto } from 'src/models/user/dtos/login-google.dto';
import { LoginDto } from 'src/models/user/dtos/login.dto';
import { RegisterDto } from 'src/models/user/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  private generateToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getCurrentUser(authPayload: IAuthPayload) {
    try {
      return await this.prisma.user.findUnique({
        where: { id: authPayload.sub },
      });
    } catch (error) {
      return null;
    }
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

    return this.generateToken(user);
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

      return this.generateToken(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong when creating the user',
      );
    }
  }

  async loginGoogle(loginGoogleDto: LoginGoogleDto) {
    try {
      const clientId = config.googleClientID;
      const token = loginGoogleDto.credentialToken;

      // Verify the token
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });

      // Get the JSON with all the user info
      const payload: TokenPayload = ticket.getPayload();
      console.log(payload);

      // Check if user exists
      let user = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        // Create new user
        user = await this.prisma.user.create({
          data: {
            id: generateRandomNumber(1, 100),
            email: payload.email,
            username: payload.name,
            first_name: payload.given_name,
            role: UserRole.USER,
            auth_provider: AuthProvider.google,
            // avatar: payload.picture,
          },
        });
      }
      return this.generateToken(user);
    } catch (error) {
      console.error('Error during Google login:', error);
      throw new Error('Google login failed');
    }
  }
}
