import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/models/user/entities/user.entity';

export class UserResponse {
  @ApiProperty()
  user: Omit<User, 'password_hash'>;
}

export class UsersResponse {
  @ApiProperty({ type: [User] })
  users: Omit<User, 'password_hash'>[];

  @ApiProperty()
  pagination: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export class CreateUserResponse {
  @ApiProperty()
  user: Omit<User, 'password_hash'>;
}

export class UpdateUserResponse {
  @ApiProperty()
  user: Omit<User, 'password_hash'>;
}

export class DeleteUserResponse {
  @ApiProperty()
  user: Omit<User, 'password_hash'>;
}
