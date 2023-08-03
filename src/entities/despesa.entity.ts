import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('despesa')
export class Despesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 191 })
  descricao: string;

  @CreateDateColumn()
  data: Date;

  @ManyToOne(() => User, (user) => user.despesa)
  user: User;

  @Column({ nullable: false })
  valor: number;
}
