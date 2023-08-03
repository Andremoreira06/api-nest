import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
