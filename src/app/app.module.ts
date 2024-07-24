import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BillingReport, Course, User } from '@/entities';
import { AuthModule } from '@/modules/auth/auth.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NI_DB_HOST,
      port: +process.env.NI_DB_PORT,
      username: process.env.NI_DB_USERNAME,
      password: process.env.NI_DB_PASS,
      database: process.env.NI_DB_NAME,
      entities: [User, Course, BillingReport],
      synchronize: true, // should disable in prod
    }),

    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
