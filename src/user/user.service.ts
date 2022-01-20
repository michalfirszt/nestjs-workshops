import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto, UserUpdateDto } from './user.dto';

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();

    return user;
  }

  async create({ name, email, password }: CreateUserData): Promise<boolean> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await getRepository(User)
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values({
        name: name,
        email: email,
        password: hashedPassword,
      })
      .execute();

    return true;
  }

  async createUser(userDto: UserCreateDto): Promise<User> {
    const { password, ...userAttrs } = userDto;

    const user = await this.userRepository.create(userAttrs);
    user.password = password;

    return user.save();
  }

  async update(user: User, userDto: UserUpdateDto): Promise<User> {
    await this.userRepository.update({ id: user.id }, { ...userDto });

    return this.userRepository.findOne(user.id);
  }
}
