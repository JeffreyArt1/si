import { IsObject, IsString } from 'class-validator';
import { JwtPayload } from '../interfaces';

export class LoggedInDto {
  @IsString()
  token: string;

  @IsObject()
  user: JwtPayload;
}
