import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { FindAllSpacesDto } from 'src/models/space/dto/find-all-space.dto';

@Injectable()
export class SpaceService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(createSpaceInput: CreateSpaceDto) {
  //   const { password, ...userData } = createSpaceInput;
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const newSpace = await this.prisma.user.create({
  //     data: {
  //       id: generateRandomNumber(1, 100),
  //       ...userData,
  //       password_hash: hashedPassword,
  //       role: SpaceRole.USER,
  //       auth_provider: AuthProvider.local,
  //     },
  //   });

  //   const { ...userWithoutPassword } = newSpace;
  //   return userWithoutPassword;
  // }

  async findAll(findAllSpacesDto: FindAllSpacesDto) {
    const { page, perPage, search } = findAllSpacesDto;
    const skip = (page - 1) * perPage || 0;

    let where: Prisma.SpaceWhereInput = {};

    if (search) {
      where = {
        OR: [{ name: { contains: search, mode: 'insensitive' } }],
      };
    }

    const [spaces, totalItems] = await Promise.all([
      this.prisma.space.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.space.count({ where }),
    ]);

    const pagination = calculatePagination(totalItems, findAllSpacesDto);

    return {
      data: spaces,
      pagination,
    };
  }

  // async findOne(id: number) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id },
  //   });

  //   if (!user) {
  //     throw new NotFoundException(`Space with ID ${id} not found`);
  //   }

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { password_hash, ...userWithoutPassword } = user;
  //   return userWithoutPassword;
  // }

  // async update(id: number, updateSpaceInput: UpdateSpaceDto) {
  //   const { ...updateData } = updateSpaceInput;

  //   const updatedSpace = await this.prisma.user.update({
  //     where: { id },
  //     data: updateData,
  //   });

  //   const { ...userWithoutPassword } = updatedSpace;
  //   return userWithoutPassword;
  // }

  // async remove(id: number) {
  //   const deletedSpace = await this.prisma.user.delete({
  //     where: { id },
  //   });

  //   const { ...userWithoutPassword } = deletedSpace;
  //   return userWithoutPassword;
  // }
}
