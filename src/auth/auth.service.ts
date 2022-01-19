import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

    const isPasswordValid = await user.getIsPasswordValid(pass);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    if (user && isPasswordValid) {
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
