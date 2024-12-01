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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma_queries_helper_1 = require("../../common/helper/prisma-queries.helper");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const pagination_1 = require("../../common/utils/pagination");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserInput) {
        const { password, ...userData } = createUserInput;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                firstName: userData.first_name,
                lastName: userData.last_name,
                nativeLanguage: userData.nativeLanguage,
                profilePicture: userData.profile_picture,
                passwordHash: hashedPassword,
                role: userData.role || client_1.UserRole.user,
                authProvider: client_1.AuthProvider.local,
            },
        });
        const { passwordHash, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword };
    }
    async findAll(findAllUsersDto) {
        const { page, perPage, search } = findAllUsersDto;
        const queryOptions = {
            where: {
                ...prisma_queries_helper_1.notDeletedQuery,
                ...(0, prisma_queries_helper_1.searchQuery)(search, ['username', 'email', 'firstName', 'lastName']),
            },
            orderBy: { createdAt: 'desc' },
            ...(0, prisma_queries_helper_1.paginationQuery)(page, perPage),
        };
        const [users, totalItems] = await Promise.all([
            this.prisma.user.findMany(queryOptions),
            this.prisma.user.count({ where: queryOptions.where }),
        ]);
        return {
            users: users.map(({ passwordHash, ...user }) => user),
            pagination: (0, pagination_1.calculatePagination)(totalItems, findAllUsersDto),
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const { passwordHash, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    }
    async update(id, updateUserInput) {
        const user = await this.prisma.user.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                ...updateUserInput,
                firstName: updateUserInput.first_name,
                lastName: updateUserInput.last_name,
            },
        });
        const { passwordHash, ...userWithoutPassword } = updatedUser;
        return { user: userWithoutPassword };
    }
    async remove(id) {
        const user = await this.prisma.user.findFirst({
            where: { id, ...prisma_queries_helper_1.notDeletedQuery },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const deletedUser = await this.prisma.user.update((0, prisma_queries_helper_1.softDeleteQuery)(id));
        const { passwordHash, ...userWithoutPassword } = deletedUser;
        return { user: userWithoutPassword };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map