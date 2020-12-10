import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users/users.service';
import { HttpExceptionThrower } from 'src/utils/functions/http-exception-thrower';
import { HttpExceptionMessages } from 'src/utils/enums/http-exception-messages.enum';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async singUp(data: SignUpDto) {
    const hash = await bcrypt.hash(data.password, 5);
    data.password = hash;
    try {
      await this.usersService.create(data);
      delete data.password;
      return data;
    } catch (error) {
      return error?.code === '23505'
        ? HttpExceptionThrower(
            HttpExceptionMessages.EMAIL_EXISTS,
            HttpStatus.BAD_REQUEST,
          )
        : HttpExceptionThrower(
            HttpExceptionMessages.INTERNAL_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  async validatePasswd(passwd: string, saltyPasswd: string) {
    const correctPasswd = await bcrypt.compare(passwd, saltyPasswd);
    if (!correctPasswd) {
      HttpExceptionThrower(
        HttpExceptionMessages.BAD_PASSWD,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthUser(email: string, passwd: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.validatePasswd(passwd, user.password);
      delete user.password;
      return user;
    } catch (error) {
      HttpExceptionThrower(
        HttpExceptionMessages.BAD_PASSWD,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
