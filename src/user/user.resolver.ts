import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserCreateDto } from './user.dto';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => User)
  async userCreate(@Args('user') userDto: UserCreateDto): Promise<User> {
    return this.userService.createUser(userDto);
  }
}
