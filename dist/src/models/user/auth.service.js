"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../common/prisma/prisma.service");
const config_1 = __importStar(require("../../config"));
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    generateTokens(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: config_1.default.jwt.jwtAccessSecret,
            expiresIn: config_1.MAX_ACCESS_TOKEN_AGE,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: config_1.default.jwt.jwtRefreshSecret,
            expiresIn: config_1.MAX_REFRESH_TOKEN_AGE,
        });
        return { accessToken, refreshToken };
    }
    async getCurrentUser(authPayload) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: String(authPayload.sub) },
            });
            return {
                user,
            };
        }
        catch (error) {
            return null;
        }
    }
    async login(loginDto, res) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.authProvider !== client_1.AuthProvider.local) {
            throw new common_1.UnauthorizedException('User is not registered with.local auth');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('The password is incorrect');
        }
        const { accessToken, refreshToken } = this.generateTokens(user);
        this.setRefreshTokenCookie(res, refreshToken);
        return {
            access_token: accessToken,
            user,
        };
    }
    async register(registerDto, res) {
        const { username, email, password, firstName, lastName, nativeLanguage } = registerDto;
        const existingUser = await this.prisma.user.findFirst({
            where: { OR: [{ email }] },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Username or email already exists');
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.prisma.user.create({
                data: {
                    username,
                    email,
                    passwordHash: hashedPassword,
                    firstName: firstName,
                    lastName: lastName,
                    nativeLanguage: nativeLanguage,
                    role: client_1.UserRole.user,
                    authProvider: client_1.AuthProvider.local,
                },
            });
            const { accessToken, refreshToken } = this.generateTokens(newUser);
            this.setRefreshTokenCookie(res, refreshToken);
            return {
                access_token: accessToken,
                user: newUser,
            };
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new common_1.InternalServerErrorException(`Something went wrong when creating the user ${error}`);
        }
    }
    async loginGoogle(loginGoogleDto, res) {
        try {
            const accessToken = loginGoogleDto.accessToken;
            const { data: payload } = await axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!payload || !payload.email) {
                throw new common_1.UnauthorizedException('Invalid Google token');
            }
            const user = await this.findOrCreateUser({
                email: payload.email,
                name: payload.name,
                firstName: payload.given_name,
                lastName: payload.family_name,
                picture: payload.picture,
                provider: client_1.AuthProvider.google,
            });
            if (user.authProvider !== client_1.AuthProvider.google) {
                throw new common_1.BadRequestException('User is not registered with Google auth');
            }
            return this.generateAuthResponse(user, res);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Error during Google login:', error);
            throw new common_1.UnauthorizedException('Google authentication failed');
        }
    }
    async loginFacebook(loginFacebookDto, res) {
        try {
            const accessToken = loginFacebookDto.accessToken;
            const { data: verifiedUserInfo } = await axios_1.default.get('https://graph.facebook.com/me', {
                params: {
                    fields: 'id,name,email,picture',
                    access_token: accessToken,
                },
            });
            if (!verifiedUserInfo || !verifiedUserInfo.email) {
                throw new common_1.UnauthorizedException('Invalid Facebook token');
            }
            const nameParts = verifiedUserInfo.name.split(' ');
            const user = await this.findOrCreateUser({
                email: verifiedUserInfo.email,
                name: verifiedUserInfo.name,
                firstName: nameParts[0],
                lastName: nameParts.slice(1).join(' '),
                picture: verifiedUserInfo.picture?.data?.url,
                provider: client_1.AuthProvider.facebook,
            });
            if (user.authProvider !== client_1.AuthProvider.facebook) {
                throw new common_1.BadRequestException('User is not registered with facebook auth');
            }
            return this.generateAuthResponse(user, res);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Error during Facebook login:', error);
            throw new common_1.UnauthorizedException('Facebook authentication failed');
        }
    }
    async findOrCreateUser(userData) {
        let user = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: userData.email,
                    username: userData.name,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    nativeLanguage: 'en',
                    role: client_1.UserRole.user,
                    authProvider: userData.provider,
                    profilePicture: userData.picture,
                },
            });
        }
        return user;
    }
    generateAuthResponse(user, res) {
        const { accessToken, refreshToken } = this.generateTokens(user);
        this.setRefreshTokenCookie(res, refreshToken);
        return {
            access_token: accessToken,
            user,
        };
    }
    async refreshToken(refreshToken, res) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: config_1.default.jwt.jwtRefreshSecret,
            });
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(user);
            this.setRefreshTokenCookie(res, newRefreshToken);
            console.log(newRefreshToken);
            return {
                access_token: accessToken,
                refresh_token: newRefreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    setRefreshTokenCookie(res, refreshToken) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    async logout(res) {
        res.clearCookie('refreshToken');
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map