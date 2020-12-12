import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bussiness } from './bussiness.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32, nullable: false })
  name: string;

  @Column()
  points: number;

  @ManyToOne((type) => Categories, (categories) => categories.id)
  @JoinColumn()
  categories: Categories;
}
