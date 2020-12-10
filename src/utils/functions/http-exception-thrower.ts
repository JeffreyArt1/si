import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessages } from '../enums/http-exception-messages.enum';

export function HttpExceptionThrower(
  message: HttpExceptionMessages,
  status: HttpStatus,
) {
  throw new HttpException(message, status);
}
