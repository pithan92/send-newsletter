import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { ClientService } from 'src/client/client.service';
import { NewsletterService } from 'src/newsletter/newsletter.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly newsletterService: NewsletterService,
    private readonly clientService: ClientService,
  ) {}
  // @Cron('0 0 * * * *') // execute a cada hora
  @Interval(10000)
  async handleCron() {
    const clientsJob = await this.clientService.findAll();
    const newsLetterJob = await this.newsletterService.findJobForEmail();
    console.log(clientsJob);
    console.log(newsLetterJob);
  }
}
