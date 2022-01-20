import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';

import { User } from './user.entity';
import { Match } from '../utilities/match.decorator';

@InputType()
export class UserCreateDto extends PickType(User, ['email', 'name']) {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UserUpdateDto extends PartialType(
  PickType(User, ['email', 'name']),
) {
  @Field()
  password: string;
}

@InputType()
export class UserUpdatePasswordDto {
  @Field()
  password: string;

  @Field()
  @Match('password')
  passwordConfirmation: string;
}
