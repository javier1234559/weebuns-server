import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthProvider, UserRole } from 'src/common/type';
import { generateRandomNumber } from 'src/common/utils/random';
import { CreateUserDto } from 'src/models/user/dtos/create-user.dto';
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
        role: UserRole.USER, // Default role
        auth_provider: AuthProvider.LOCAL,
      },
    });

    const { password_hash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password_hash, ...user }) => user);
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

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

    const { password_hash, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  }
}
