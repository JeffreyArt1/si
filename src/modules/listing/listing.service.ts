import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Bussiness } from './entities/bussiness.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Bussiness)
    private readonly bussinessRepository: Repository<Bussiness>,
  ) {}

  async getBussiness(id: number): Promise<Bussiness> {
    return this.bussinessRepository.findOne(id);
  }

  async getAllBussinesses(): Promise<Bussiness[]> {
    return this.bussinessRepository.find();
  }

  async createBussiness(data: Bussiness) {
    return this.bussinessRepository.save(data);
  }
}
