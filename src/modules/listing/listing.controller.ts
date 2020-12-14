import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { TransformInterceptor } from '@common/interceptors';
import { Bussiness } from './entities/bussiness.entity';
import { JwtAuthGuard } from '@modules/auth/guards';
import { ListingService } from './listing.service';
import { ReadBussinessDto } from './dto';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(ReadBussinessDto))
  @UseGuards(JwtAuthGuard)
  getListing() {
    return this.listingService.getAllBussinesses();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createBussiness(@Body() bussiness: Bussiness) {
    return this.listingService.createBussiness(bussiness);
  }
}
