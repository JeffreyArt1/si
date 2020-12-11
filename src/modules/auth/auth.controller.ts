import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { RequestWithtUser } from './interfaces/requestWithUser.interface';
import { LocalAuth } from './users/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: SignUpDto) {
    return this.authService.singUp(data);
  }

  @HttpCode(200)
  @UseGuards(LocalAuth)
  @Post('log-in')
  async logIn(@Req() request: RequestWithtUser) {
    const user = request.user;
    delete user.password;
    return user;
  }
}
