import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Languages {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 16, nullable: false })
  @Index()
  language: string;
}
