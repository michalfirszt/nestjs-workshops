import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
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
}
