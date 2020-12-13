import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { HttpExceptionMessages } from 'src/utils/enums/http-exception-messages.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { User } from '../users/entities/';
import { MailService } from 'src/utils/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async singUp(user: SignUpDto) {
    const { email } = user;
    const userAlreadyExists: User = await this.usersService.userExists(
      0,
      email,
    );

    if (userAlreadyExists) {
      throw new ConflictException(HttpExceptionMessages.EMAIL_EXISTS);
    }

    user.password = await bcrypt.hash(user.password, 8);
    const createdUser: User = await this.usersService.create(user);

    const message = await this.verifyEmail(createdUser);
  }

  async validatePasswd(passwd: string, saltyPasswd: string) {
    const correctPasswd = await bcrypt.compare(passwd, saltyPasswd);
    if (!correctPasswd) {
      new InternalServerErrorException(HttpExceptionMessages.BAD_PASSWD);
    }
  }

  async getAuthUser(email: string, passwd: string) {
    try {
      const user = await this.usersService.getUser(0, email);
      await this.validatePasswd(passwd, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      new InternalServerErrorException(HttpExceptionMessages.BAD_PASSWD);
    }
  }

  getUserCookieWithJwtToken(id: number) {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPI',
    )}`;
  }

  getLogOutCookie() {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }

  verifyEmail(user: User) {
    return user;
  }
}
