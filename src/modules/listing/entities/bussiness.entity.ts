import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { PaymentMethods } from './payment-methods.entity';
import { Schedule } from './schedule.entity';
import { Languages } from './languages.entity';

@Entity()
export class Bussiness {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32, nullable: false })
  @Index()
  name: string;

  @Column({ length: 128 })
  description: string;

  //? Esto deberia ser un enum o algo
  @Column({ length: 32 })
  country: string;

  @Column({ length: 32 })
  city: string;

  @Column()
  zip_code: number;

  @Column({ length: 128, nullable: false })
  address: string;

  @Column({ length: 16, nullable: false })
  phone: string;

  @Column({ type: 'text', array: true })
  tags: string[];

  @Column({ length: 256 })
  website: string;

  @OneToMany((type) => Categories, (category) => category.id)
  @JoinColumn()
  categories: Categories;

  @OneToMany((type) => PaymentMethods, (paymentMethod) => paymentMethod.id)
  @JoinColumn()
  payment_methods: PaymentMethods;

  @OneToMany((type) => Schedule, (schedule) => schedule.id)
  @JoinColumn()
  schedule: Schedule;

  @OneToMany((type) => Languages, (language) => language.id)
  @JoinColumn()
  languages: Languages;

  @Column({ length: 256 })
  logo: string;
}
