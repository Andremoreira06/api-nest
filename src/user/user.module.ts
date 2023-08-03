import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { DespesaService } from 'src/despesa/despesa.service';
import { Despesa } from 'src/entities/despesa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Despesa])],
  controllers: [UserController],
  providers: [UserService, DespesaService],
})
export class UserModule {}
