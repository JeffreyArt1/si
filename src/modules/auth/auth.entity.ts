import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 16, nullable: false })
  @Index()
  username: string;

  @Column({ length: 48, nullable: false })
  password: string;

  @Column({ length: 24, nullable: false })
  name: string;

  @Column({ length: 24, nullable: false })
  lastname: string;
}
