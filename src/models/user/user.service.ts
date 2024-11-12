import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthProvider, Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { CreateUserDto } from 'src/models/user/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/models/user/dtos/find-all-user.dto';
import { UpdateUserDto } from 'src/models/user/dtos/update-user.dto';
import {
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserResponse,
  UserResponse,
  UsersResponse,
} from 'src/models/user/dtos/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserDto): Promise<CreateUserResponse> {
    const { password, ...userData } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
        role: UserRole.user,
        authProvider: AuthProvider.local,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  }

  async findAll(findAllUsersDto: FindAllUsersDto): Promise<UsersResponse> {
    const { page, perPage, search } = findAllUsersDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.UserWhereInput = {};

    if (search) {
      where = {
        OR: [
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const [users, totalItems] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllUsersDto);

    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      users: users.map(({ passwordHash, ...user }) => user),
      pagination,
    };
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }

  async update(
    id: string,
    updateUserInput: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = updatedUser;
    return { user: userWithoutPassword };
  }

  async remove(id: string): Promise<DeleteUserResponse> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = deletedUser;
    return { user: userWithoutPassword };
  }
}
