import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from 'src/models/user/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/models/user/dtos/find-all-user.dto';
import { UpdateUserDto } from 'src/models/user/dtos/update-user.dto';
import { CreateUserResponse, DeleteUserResponse, UpdateUserResponse, UserResponse, UsersResponse } from 'src/models/user/dtos/user-response.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserDto): Promise<CreateUserResponse>;
    findAll(findAllUsersDto: FindAllUsersDto): Promise<UsersResponse>;
    findOne(id: string): Promise<UserResponse>;
    update(id: string, updateUserInput: UpdateUserDto): Promise<UpdateUserResponse>;
    remove(id: string): Promise<DeleteUserResponse>;
}
