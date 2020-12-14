import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => User, (user) => user.tokens)
  user: User;

  @Column({ type: 'varchar', nullable: false })
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
