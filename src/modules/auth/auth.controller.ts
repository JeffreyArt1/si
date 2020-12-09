import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  getListing(): string {
    return 'Compayyyy';
  }
}
