import { randomBytes } from 'crypto';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './token.entity';

@Entity()
export class User extends BaseEntity {
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

  async generateToken(): Promise<Token> {
    const token = new Token();
    token.user = this;
    token.token = randomBytes(20).toString('hex');
    token.createdAt = new Date();

    return await token.save();
  }
}
