import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';
import { Language } from '../entities/language.entity';
import { PaymentMethod } from '../entities/payment-method.entity';
import { Schedule } from '../entities/schedule.entity';

export class CreateBussinessDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsNumber()
  zip_code: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  tags: string[];

  @IsString()
  website: string;

  categories: Category[];

  payment_methods: PaymentMethod[];

  schedule: Schedule[];

  languages: Language[];

  @IsString()
  logo: string;
}
