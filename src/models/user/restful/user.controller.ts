import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard } from 'src/common/auth/role.guard';
import { UserRole } from 'src/common/type/enum';
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
import { UserService } from 'src/models/user/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get()
  async findAll(
    @Query() findAllUsersDto: FindAllUsersDto,
  ): Promise<UsersResponse> {
    return this.userService.findAll(findAllUsersDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteUserResponse> {
    return this.userService.remove(+id);
  }
}
