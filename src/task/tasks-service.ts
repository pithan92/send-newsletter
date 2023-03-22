import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  // @Cron('0 0 * * * *') // execute a cada hora
  handleCron() {
    console.log('Executando tarefa cron...');
  }
}
