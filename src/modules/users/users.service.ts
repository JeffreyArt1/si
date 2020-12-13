import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HttpExceptionMessages } from 'src/utils/enums/http-exception-messages.enum';
import { CreateUserDto } from './dto/';
import { User } from './entities/';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async getUser(id?: number, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ id }, { email }],
    });
    if (user) return user;
    new NotFoundException(HttpExceptionMessages.EMAIL_NOT_EXISTS);
  }

  async userExists(id?: number, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ id }, { email }],
    });
    return user ? user : null;
  }
}
