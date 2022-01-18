import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthConfig } from './auth.config';

@Module({
  imports: [
    ConfigModule.forFeature(AuthConfig),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(AuthConfig)],
      inject: [AuthConfig.KEY],
      useFactory: (authConfig: ConfigType<typeof AuthConfig>) => ({
        secret: authConfig.jwtSecret,
        signOptions: { expiresIn: authConfig.sessionExpirationTime },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
