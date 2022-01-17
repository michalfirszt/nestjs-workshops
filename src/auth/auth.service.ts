import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import { UserService, CreateUserData } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const validPassword = await bcrypt.compare(pass, user.password);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(userData: CreateUserData): Promise<any> {
    const user = await this.userService.create(userData);

    return user;
  }

  async login(user: User): Promise<any> {
    const payload = { username: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
