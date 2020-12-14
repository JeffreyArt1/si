import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { Bussiness } from './entities/';

@Module({
  imports: [TypeOrmModule.forFeature([Bussiness])],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
