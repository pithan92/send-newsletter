import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ClientModule } from './client/client.module';
import { ClientEntity } from './client/entities/client.entity';
import { NewsletterEntity } from './newsletter/entities/newsletter.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task/tasks-service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sendEmail',
      entities: [ClientEntity, NewsletterEntity],
      synchronize: true,
    }),
    NewsletterModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
