import { Module } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';
import { Despesa } from 'src/entities/despesa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  controllers: [DespesaController],
  providers: [DespesaService],
})
export class DespesaModule {}
