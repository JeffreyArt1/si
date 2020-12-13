import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Bussiness } from './bussiness.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32, nullable: false })
  name: string;

  @Column()
  points: number;

  @ManyToOne((type) => Bussiness, (bussiness) => bussiness.categories)
  bussiness: Bussiness;
}
