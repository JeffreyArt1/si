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

import { PaymentMethod, Schedule, Category, Language } from './';

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

  @ManyToMany((type) => Category, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(
    (type) => PaymentMethod,
    (paymentMethod) => paymentMethod.bussiness,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn()
  payment_methods: PaymentMethod[];

  @OneToMany((type) => Schedule, (schedule) => schedule.bussiness, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  schedule: Schedule[];

  @ManyToMany((type) => Language, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  languages: Language[];

  @Column()
  logo: string;
}
