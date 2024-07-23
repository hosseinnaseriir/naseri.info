import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ConfigModule.forRoot(),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (_configService: ConfigService) => ({
      secret: 'default_secret_key',
      signOptions: { expiresIn: '60m' },
    }),
    inject: [ConfigService],
  }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule { }


