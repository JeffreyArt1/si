import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HttpExceptionMessages } from 'src/utils/enums/http-exception-messages.enum';
import { HttpExceptionThrower } from 'src/utils/functions/http-exception-thrower';
import { CreateUserDto } from './dto/';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (user) return user;
    HttpExceptionThrower(
      HttpExceptionMessages.EMAIL_NOT_EXISTS,
      HttpStatus.NOT_FOUND,
    );
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(data); //????
    await this.userRepository.save(user);
    return user;
  }
}
