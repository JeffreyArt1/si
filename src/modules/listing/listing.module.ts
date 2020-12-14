import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bussiness } from './entities/bussiness.entity';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bussiness])],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
