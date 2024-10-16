import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthProvider, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRole } from 'src/common/type/enum';
import { calculatePagination } from 'src/common/utils/pagination';
import { generateRandomNumber } from 'src/common/utils/random';
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
        id: generateRandomNumber(1, 100),
        ...userData,
        password_hash: hashedPassword,
        role: UserRole.USER,
        auth_provider: AuthProvider.local,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = newUser;
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
          { first_name: { contains: search, mode: 'insensitive' } },
          { last_name: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const [users, totalItems] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllUsersDto);

    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      users: users.map(({ password_hash, ...user }) => user),
      pagination: {
        ...pagination,
        itemCount: users.length,
      },
    };
  }

  async findOne(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }

  async update(
    id: number,
    updateUserInput: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = updatedUser;
    return { user: userWithoutPassword };
  }

  async remove(id: number): Promise<DeleteUserResponse> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = deletedUser;
    return { user: userWithoutPassword };
  }
}
