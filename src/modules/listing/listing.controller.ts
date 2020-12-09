import { Controller, Get } from '@nestjs/common';

@Controller('listing')
export class ListingController {
  @Get()
  getListing(): string {
    return 'Compay';
  }
}
