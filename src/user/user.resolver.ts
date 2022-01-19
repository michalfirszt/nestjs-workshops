import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserCreateDto } from './user.dto';
import { UserGraphqlAuthGuard } from '../auth/guards/user-graphql-auth.guard';
import { CurrentUserGql } from '../utilities/current-user-gql.decorator';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Query(() => User)
  async currentUser(@CurrentUserGql() currentUser: User): Promise<User> {
    return currentUser;
  }

  @Mutation(() => User)
  async userCreate(@Args('user') userDto: UserCreateDto): Promise<User> {
    return this.userService.createUser(userDto);
  }
}
