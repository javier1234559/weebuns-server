import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';
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
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized - Invalid or missing authentication token',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Forbidden - User does not have required roles',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.USER)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a paginated list of users with optional filters',
  })
  @ApiQuery({
    type: FindAllUsersDto,
    description: 'Query parameters for filtering and pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users retrieved successfully',
    type: UsersResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query parameters',
  })
  async findAll(
    @Query() findAllUsersDto: FindAllUsersDto,
  ): Promise<UsersResponse> {
    return this.userService.findAll(findAllUsersDto);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get user by ID',
    description:
      'Retrieve detailed information about a specific user. Admin access only.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: String,
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found successfully',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create new user',
    description: 'Create a new user account. Admin access only.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: CreateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user data provided',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update user by ID',
    description: 'Update user information. Admin access only.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: String,
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid update data provided',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete user by ID',
    description: 'Permanently remove a user account. Admin access only.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: String,
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    type: DeleteUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Cannot delete user with active dependencies',
  })
  async remove(@Param('id') id: string): Promise<DeleteUserResponse> {
    return this.userService.remove(id);
  }
}
