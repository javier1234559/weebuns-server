import { ApiProperty } from '@nestjs/swagger';

import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/models/user/entities/user.entity';

export class UserResponse {
  @ApiProperty()
  user: Omit<User, 'password_hash'>;
}

export class UsersResponse {
  @ApiProperty({ type: [User] })
  users: Omit<User, 'password_hash'>[];

  @ApiProperty()
  @ApiProperty({ type: PaginationOutputDto })
  pagination: PaginationOutputDto;
}

export class CreateUserResponse {
  @ApiProperty()
  @ApiProperty({ type: User })
  user: Omit<User, 'password_hash'>;
}

export class UpdateUserResponse {
  @ApiProperty()
  @ApiProperty({ type: User })
  user: Omit<User, 'password_hash'>;
}

export class DeleteUserResponse {
  @ApiProperty()
  @ApiProperty({ type: User })
  user: Omit<User, 'password_hash'>;
}
