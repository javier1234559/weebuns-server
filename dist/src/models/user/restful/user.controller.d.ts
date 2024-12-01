import { CreateUserDto } from 'src/models/user/dtos/create-user.dto';
import { FindAllUsersDto } from 'src/models/user/dtos/find-all-user.dto';
import { UpdateUserDto } from 'src/models/user/dtos/update-user.dto';
import { CreateUserResponse, DeleteUserResponse, UpdateUserResponse, UserResponse, UsersResponse } from 'src/models/user/dtos/user-response.dto';
import { UserService } from 'src/models/user/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(findAllUsersDto: FindAllUsersDto): Promise<UsersResponse>;
    findOne(id: string): Promise<UserResponse>;
    create(createUserDto: CreateUserDto): Promise<CreateUserResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse>;
    remove(id: string): Promise<DeleteUserResponse>;
}
