import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  @Index()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastname: string;

  @OneToMany((type) => Token, (token) => token.user)
  tokens: string[];
}
