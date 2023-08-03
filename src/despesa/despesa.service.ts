import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Despesa } from 'src/entities/despesa.entity';
import { Repository } from 'typeorm';
import { CreateDespesaDto, UpdateDespesaDto } from './dto/DespesaDto';
import { User } from 'src/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,
    private readonly mailerService: MailerService,
  ) {}

  async findOne(id: number, user: User) {
    const despesa = await this.despesaRepository.findOne({
      where: { id: id, user: { id: user.id } },
    });
    if (!despesa) {
      throw new NotFoundException();
    }
    return despesa;
  }

  async findDespesaUsuario(usuario: User) {
    return await this.despesaRepository.find({
      where: { user: { id: usuario.id } },
    });
  }

  async create(createDespesaDto: CreateDespesaDto, user: User) {
    createDespesaDto.user = user;
    const despesa = await this.despesaRepository.create(createDespesaDto);
    const despesaSalva = await this.despesaRepository.save(despesa);
    if (despesaSalva) {
      try {
        await this.mailerService.sendMail({
          to: user.username,
          from: 'andrefmoreira06@gmail.com',
          subject: 'Despesa Cadastrada',
          text: '',
          html:
            '<div>Id:' +
            despesaSalva.id +
            '<br/>Descrição:' +
            despesaSalva.descricao +
            '<br/>Data:' +
            new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              minute: '2-digit',
              hour: '2-digit',
              timeZone: 'America/Sao_Paulo',
            }).format(despesaSalva.data) +
            '<br/>Usuario:' +
            despesaSalva.user.nome +
            '<br/>Valor:' +
            despesaSalva.valor +
            '</div>',
        });
      } catch (e) {
        console.log('erro ao enviar email com erro:' + e);
      }
    }
    return despesaSalva;
  }

  async update(id: number, updateDespesaDto: UpdateDespesaDto, user: User) {
    const despesa = await this.despesaRepository.findOne({
      where: { id: id, user: { id: user.id } },
    });
    if (!despesa) {
      throw new NotFoundException();
    }
    return await this.despesaRepository.update(id, updateDespesaDto);
  }

  async delete(id: number, user: User) {
    const despesa = await this.despesaRepository.findOne({
      where: { id: id, user: { id: user.id } },
    });
    if (!despesa) {
      throw new NotFoundException();
    }
    return this.despesaRepository.delete(id);
  }
}
