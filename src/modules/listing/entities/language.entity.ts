import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Bussiness } from './bussiness.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 16, nullable: false })
  @Index()
  language: string;

  @ManyToOne((type) => Bussiness, (bussiness) => bussiness.languages)
  bussiness: Bussiness;
}
