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
import { Roles } from 'src/common/auth/role.guard';
import { UserRole } from 'src/common/type';
import { CreateUserDto } from 'src/models/user/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/models/user/dtos/find-all-user.dto';
import { UpdateUserDto } from 'src/models/user/dtos/update-user.dto';
import { UserService } from 'src/models/user/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard)
  // @Roles(UserRole.ADMIN)
  @Get()
  async findAll(@Query() findAllUsersDto: FindAllUsersDto) {
    return this.userService.findAll(findAllUsersDto);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
