import { Module } from '@nestjs/common';
import { UserResolver } from './graphql/user.resolver';
import { UserService } from './user.service';
import { AuthService } from 'src/models/user/auth.service';
import { UserController } from 'src/models/user/restful/user.controler';

@Module({
  providers: [UserResolver, UserService, AuthService],
  exports: [UserService],
  controllers: [
    UserController
  ],
})
export class UserModule {}
