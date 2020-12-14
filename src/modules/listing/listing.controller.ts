import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(ReadBussinessDto))
  @UseGuards(JwtAuthGuard)
  getListing(@Param('id') id: number): Promise<Bussiness> {
    return this.listingService.getBussiness(id);
  }

  @Get()
  @UseInterceptors(new TransformInterceptor(ReadBussinessDto))
  @UseGuards(JwtAuthGuard)
  getListings(
    @Query('sort') sort: string,
    @Query('city') city: string,
    @Query('name') name: string,
  ): Promise<Bussiness[]> {
    return this.listingService.getAllBussinesses(sort, city, name);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createBussiness(@Body() bussiness: Bussiness) {
    return this.listingService.createBussiness(bussiness);
  }
}
