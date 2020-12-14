import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors';
import { JwtAuthGuard } from '../auth/guards';
import { ReadBussinessDto } from './dto';
import { Bussiness } from './entities/bussiness.entity';
import { ListingService } from './listing.service';

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
