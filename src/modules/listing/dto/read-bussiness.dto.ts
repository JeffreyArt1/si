import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';
import { Language } from '../entities/language.entity';
import { PaymentMethod } from '../entities/payment-method.entity';
import { Schedule } from '../entities/schedule.entity';

export class ReadBussinessDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  description: string;

  @IsString()
  @Expose()
  country: string;

  @IsString()
  @Expose()
  city: string;

  @IsNumber()
  @Expose()
  zip_code: number;

  @IsString()
  @Expose()
  address: string;

  @IsString()
  @Expose()
  phone: string;

  @IsString()
  @Expose()
  tags: string[];

  @IsString()
  @Expose()
  website: string;

  @Expose()
  categories: Category[];

  @Expose()
  payment_methods: PaymentMethod[];

  @Expose()
  schedule: Schedule[];

  @Expose()
  languages: Language[];

  @IsString()
  @Expose()
  logo: string;
}
