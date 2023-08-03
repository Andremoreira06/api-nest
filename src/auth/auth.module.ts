import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { DespesaService } from 'src/despesa/despesa.service';
import { Despesa } from 'src/entities/despesa.entity';

@Module({
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    DespesaService,
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, Despesa]),
    JwtModule.register({
      secret: 'api',
      signOptions: { expiresIn: '2d' },
    }),
  ],
})
export class AuthModule {}
