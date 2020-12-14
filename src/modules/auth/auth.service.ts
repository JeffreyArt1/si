import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

import { HttpExceptionMessages } from 'src/utils/enums/http-exception-messages.enum';
import { JwtPayload } from './interfaces/';
import { MailService } from 'src/utils/mail/mail.service';
import { UsersService } from '../users/users.service';
import { SignInDto, SignUpDto } from './dto/';
import { Token, User } from '../users/entities/';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async signup(user: SignUpDto) {
    const { email } = user;
    const userAlreadyExists: User = await this.usersService.userExists(email);

    if (userAlreadyExists) {
      throw new ConflictException(HttpExceptionMessages.EMAIL_EXISTS);
    }

    user.password = await bcrypt.hash(user.password, 8);
    const createdUser: User = await this.usersService.create(user);
    const message = await this.sendAccountValidationMail(createdUser);

    return { success: true, message };
  }

  async login(credentials: SignInDto) {
    const { email, password } = credentials;

    const user: User = await this.usersService.userExists(email);
    if (!user) {
      throw new NotFoundException(HttpExceptionMessages.EMAIL_NOT_EXISTS);
    }

    const correctPasswd = await bcrypt.compare(password, user.password);
    if (!correctPasswd) {
      throw new UnauthorizedException(HttpExceptionMessages.BAD_PASSWD);
    }

    if (!user.verified) {
      throw new UnauthorizedException(HttpExceptionMessages.EMAIL_NOT_VERIFIED);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = this.jwtService.sign(payload);

    return { token, user: payload };
  }

  getUserCookieWithJwtToken(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPI',
    )}`;
  }

  logout() {
    return {
      cookie: 'Authentication=; HttpOnly; Path=/; Max-Age=0',
      message: 'You successfully logged out',
    };
  }

  async sendAccountValidationMail(user: User) {
    const { token } = await user.generateToken();
    const subject = `Welcome ${user.name}!`;
    const to = user.email;
    const from = this.configService.get('SNGRD_MAIL');
    const link = `http://${this.request.headers.host}/api/auth/verify?token=${token}`;
    const html = `<p>Hi <strong>${user.name}</strong>,<p>
                  <br>
                  <p>We're almos set. To continue, click on this <a href="${link}">link</a> to verify your account.</p> 
                  <br>
                  <p>If you didn't request this, please ignore this email.</p>`;

    await this.mailService.sendEmail({ to, from, subject, html });

    return `A verification email has been sent to ${user.email}.`;
  }
}
