import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';

@Controller('listing')
export class ListingController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getListing(): string {
    return 'Compay';
  }
}
