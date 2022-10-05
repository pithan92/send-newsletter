import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ClientModule } from './client/client.module';
import { ClientEntity } from './client/entities/client.entity';
import { Newsletter } from './newsletter/entities/newsletter.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sendEmail',
      entities: [ClientEntity, Newsletter],
      synchronize: true,
    }),
    NewsletterModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
