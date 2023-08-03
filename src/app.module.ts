import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DespesaModule } from './despesa/despesa.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: `${process.env.DATABASENAME}`,
      host: `${process.env.DATABASEHOST}`,
      port: 3306,
      username: `${process.env.DATABASEUSER}`,
      password: `${process.env.DATABASEPASSWORD}`,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILERHOST,
        auth: {
          user: process.env.MAILERUSER,
          pass: process.env.MAILERPASSWORD,
        },
      },
    }),
    UserModule,
    DespesaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
