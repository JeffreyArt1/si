import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  //? esto deberia ser el id de otra entidad con los dias de la semana
  @Column()
  day: number;

  @Column({ length: 6 })
  open: string;

  @Column({ length: 6 })
  close: string;
}
