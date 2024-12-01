import { PaginationInputDto, PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/models/user/entities/user.entity';
export declare class FindAllUsersDto extends PaginationInputDto {
    search?: string;
}
export declare class UsersResponse {
    data: User[];
    pagination: PaginationOutputDto;
}
