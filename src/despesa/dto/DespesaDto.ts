import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
  Min,
} from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateDespesaDto {
  @ApiProperty({ description: 'Pode ter no maximo 191 caracteres' })
  @IsString()
  @MaxLength(191)
  descricao: string;

  @ApiProperty({ description: 'Não pode ser negativo' })
  @IsNumber()
  @Min(0)
  valor: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  data: Date;

  user: User;
}

export class UpdateDespesaDto extends PartialType(CreateDespesaDto) {}
