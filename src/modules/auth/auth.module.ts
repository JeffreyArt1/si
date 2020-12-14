import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@modules/users/users.module';
import { MailModule } from '@utils/mail/mail.module';
import { AuthController } from './auth.controller';
import { Token } from '@modules/users/entities';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/';

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
