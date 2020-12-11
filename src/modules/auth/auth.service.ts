import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users/users.service';
import { HttpExceptionMessages } from 'src/utils/enums/http-exception-messages.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async singUp(data: SignUpDto) {
    const hash = await bcrypt.hash(data.password, 5);
    data.password = hash;
    try {
      await this.usersService.create(data);
      data.password = undefined;
      return data;
    } catch (error) {
      return error?.code === '23505'
        ? new BadRequestException(HttpExceptionMessages.EMAIL_EXISTS)
        : new InternalServerErrorException(
            HttpExceptionMessages.INTERNAL_ERROR,
          );
    }
  }

  async validatePasswd(passwd: string, saltyPasswd: string) {
    const correctPasswd = await bcrypt.compare(passwd, saltyPasswd);
    if (!correctPasswd) {
      new InternalServerErrorException(HttpExceptionMessages.BAD_PASSWD);
    }
  }

  async getAuthUser(email: string, passwd: string) {
    try {
      const user = await this.usersService.getByEmail(email);
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
}
