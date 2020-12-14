import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LoggedInDto, SignInDto, SignUpDto } from './dto';
import { RequestWithtUser } from './interfaces/';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  auth(@Req() req: RequestWithtUser) {
    const user = req.user;
    user.password = undefined;
  }

  @Post('signup')
  async signup(@Body() data: SignUpDto) {
    return this.authService.signup(data);
  }

  @Post('login')
  async login(
    @Body() credentials: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoggedInDto> {
    const { token } = await this.authService.login(credentials);
    const cookie = this.authService.getUserCookieWithJwtToken(token);
    response.setHeader('Set-Cookie', cookie);

    return this.authService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    const { cookie, message } = await this.authService.logout();
    response.setHeader('Set-Cookie', cookie);
    return { success: true, message };
  }
}
