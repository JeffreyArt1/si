import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Bussiness } from './entities/';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Bussiness)
    private readonly bussinessRepository: Repository<Bussiness>,
  ) {}

  async getBussiness(id: number): Promise<Bussiness> {
    return this.bussinessRepository.findOne(id);
  }

  async getAllBussinesses(
    sort = 'ASC',
    city?: string,
    name?: string,
  ): Promise<Bussiness[]> {
    if (name) {
      return await this.bussinessRepository.find({
        where: { name },
        order: { name: sort === 'ASC' ? 'ASC' : 'DESC' },
      });
    }
    if (city) {
      return await this.bussinessRepository.find({
        where: { city },
        order: { name: sort === 'ASC' ? 'ASC' : 'DESC' },
        cache: true,
      });
    }
    if (name && city) {
      return await this.bussinessRepository.find({
        where: [{ name }, { city }],
        order: { name: sort === 'ASC' ? 'ASC' : 'DESC' },
        cache: true,
      });
    }

    return await this.bussinessRepository.find({
      order: { name: 'ASC' },
      cache: true,
    });
  }

  async createBussiness(data: Bussiness) {
    return this.bussinessRepository.save(data);
  }
}
