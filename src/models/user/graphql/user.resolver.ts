import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { UserService } from '../user.service';
import { CreateUserDto } from 'src/models/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/models/user/dtos/update-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => User)
  // createUser(@Args('CreateUserDto') createUserInput: CreateUserDto  ) {
  //   return this.userService.create(createUserInput);
  // }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
  //   return this.userService.update(updateUserDto.id, updateUserDto);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
}
