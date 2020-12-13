import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Bussiness } from './bussiness.entity';

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

  @ManyToOne((type) => Bussiness, (bussiness) => bussiness.schedule)
  bussiness: Bussiness;
}
