import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  throwException = (message: string, status: HttpStatus) => {
    throw new HttpException(message, status);
  };

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user
      ? user
      : this.throwException(
          "Oops! this email doesn't seem to exist in our DB",
          HttpStatus.NOT_FOUND,
        );
  }

  async createUser(data: CreateUserDto) {
    const user = await this.userRepository.create(data); //????
    await this.userRepository.save(user);
    return user;
  }
}
