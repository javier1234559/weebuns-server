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

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserDto) {
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

    const { ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async findAll(findAllUsersDto: FindAllUsersDto) {
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
      data: users.map(({ password_hash, ...user }) => user),
      pagination,
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: number, updateUserInput: UpdateUserDto) {
    const { ...updateData } = updateUserInput;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    const { ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    const { ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  }
}
