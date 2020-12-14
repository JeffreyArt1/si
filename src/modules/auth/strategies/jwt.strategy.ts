import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from '@modules/users/users.service';
import { JwtPayload } from '@modules/auth/interfaces/';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SCRT'),
    });
  }
  async validate(payload: JwtPayload) {
    return this.usersService.getUser(payload.id);
  }
}
