import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Despesa } from './despesa.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @OneToMany(() => Despesa, (despesa) => despesa.user, { cascade: true })
  despesa: Despesa[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
