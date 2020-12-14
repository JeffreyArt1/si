import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/';
import { UsersModule } from '../users/users.module';
import { MailModule } from 'src/utils/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../users/entities';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SCRT'),
        signOptions: { expiresIn: configService.get('JWT_EXPI') },
      }),
    }),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
