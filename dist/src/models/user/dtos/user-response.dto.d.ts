import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/models/user/entities/user.entity';
export declare class UserResponse {
    user: Omit<User, 'passwordHash'>;
}
export declare class UsersResponse {
    users: Omit<User, 'passwordHash'>[];
    pagination: PaginationOutputDto;
}
export declare class CreateUserResponse {
    user: Omit<User, 'passwordHash'>;
}
export declare class UpdateUserResponse {
    user: Omit<User, 'passwordHash'>;
}
export declare class DeleteUserResponse {
    user: Omit<User, 'passwordHash'>;
}
