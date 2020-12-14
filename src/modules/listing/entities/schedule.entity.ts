import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Bussiness } from './bussiness.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  day: number;

  @Column({ length: 6 })
  open: string;

  @Column({ length: 6 })
  close: string;

  @ManyToOne((type) => Bussiness, (bussiness) => bussiness.schedule)
  @JoinColumn()
  bussiness: Bussiness;
}
