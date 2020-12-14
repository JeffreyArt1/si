import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { PaymentMethod } from './payment-method.entity';
import { Schedule } from './schedule.entity';
import { Language } from './language.entity';

@Entity()
export class Bussiness {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  @Index()
  zip_code: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  @Index()
  phone: string;

  @Column({ type: 'text', array: true })
  tags: string[];

  @Column()
  @Index()
  website: string;

  @ManyToMany((type) => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany((type) => PaymentMethod, (paymentMethod) => paymentMethod.id)
  @JoinColumn()
  payment_methods: PaymentMethod[];

  @OneToMany((type) => Schedule, (schedule) => schedule.id)
  @JoinColumn()
  schedule: Schedule[];

  @ManyToMany((type) => Language)
  @JoinTable()
  languages: Language[];

  @Column()
  logo: string;
}
