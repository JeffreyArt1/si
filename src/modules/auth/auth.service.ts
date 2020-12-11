import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users/users.service';
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
      delete user.password;
      return user;
    } catch (error) {
      new InternalServerErrorException(HttpExceptionMessages.BAD_PASSWD);
    }
  }
}
