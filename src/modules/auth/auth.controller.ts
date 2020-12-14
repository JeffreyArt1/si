import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { RequestWithtUser } from './interfaces/';
import { JwtAuthGuard, LocalAuth } from './guards/';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  auth(@Req() req: RequestWithtUser) {
    const user = req.user;
    user.password = undefined;
  }

  @Post('register')
  async register(@Body() data: SignUpDto) {
    return this.authService.singUp(data);
  }

  @HttpCode(200)
  @UseGuards(LocalAuth)
  @Post('login')
  async logIn(@Req() req: RequestWithtUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getUserCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() req: RequestWithtUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getLogOutCookie());
    return res.sendStatus(200);
  }
}
