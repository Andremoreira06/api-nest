import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto, UpdateDespesaDto } from './dto/DespesaDto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('despesa')
@UseGuards(JwtGuard)
@Controller('despesa')
export class DespesaController {
  constructor(private readonly despesaService: DespesaService) {}

  @Get(':id')
  findOne(@Param('id') id: number, @Request() req) {
    return this.despesaService.findOne(id, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.despesaService.findDespesaUsuario(req.user);
  }

  @Post()
  create(@Body() createDespesaDto: CreateDespesaDto, @Request() req) {
    return this.despesaService.create(createDespesaDto, req.user);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDespesaDto: UpdateDespesaDto,
    @Request() req,
  ) {
    return this.despesaService.update(id, updateDespesaDto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Request() req) {
    return this.despesaService.delete(id, req.user);
  }
}
