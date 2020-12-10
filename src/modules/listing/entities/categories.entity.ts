import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32, nullable: false })
  name: string;

  @Column()
  points: number;
}
