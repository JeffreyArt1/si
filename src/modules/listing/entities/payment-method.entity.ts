import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Bussiness } from './bussiness.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32, nullable: false })
  name: string;

  @ManyToOne((type) => Bussiness, (bussiness) => bussiness.payment_methods)
  bussiness: Bussiness;
}
