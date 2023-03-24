import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { ClientService } from 'src/client/client.service';
import { ClientEntity } from 'src/client/entities/client.entity';
import { NewsletterEntity } from 'src/newsletter/entities/newsletter.entity';
import { NewsletterService } from 'src/newsletter/newsletter.service';
import { isBirthDay } from 'src/Util';

interface EmailJob {
  email: string;
  emailTemplate: string;
}
@Injectable()
export class TasksService {
  constructor(
    private readonly newsletterService: NewsletterService,
    private readonly clientService: ClientService,
  ) {}
  // @Cron('0 0 * * * *') // execute a cada hora
  @Interval(10000)
  async handleCron() {
    await this.buildEmail();
  }
  async buildEmail() {
    const clientsJob = await this.clientService.findAll();
    const emailBody = await this.buildNews();
    const listSend: EmailJob[] = [];
    clientsJob.forEach((client) =>
      listSend.push(this.buildTemplateEmail(emailBody, client)),
    );
  }
  buildTemplateEmail(emailBody: string, client: ClientEntity): EmailJob {
    const { email, name, birthDay } = client;
    const top = this.buildHead(name, isBirthDay(birthDay));
    const body = emailBody;
    const footer = 'Até a próxima.';
    const emailTemplate = `${top}
    ${body}
    ${footer}`;
    return { email, emailTemplate };
  }
  buildHead(name: string, day: boolean) {
    return `Bom dia ${name} ${day ? 'Feliz aniversário' : ''}
    Segue as notícias de hoje.`;
  }

  async buildNews() {
    const newsLetterJob = await this.newsletterService.findJobForEmail();
    let body = '';
    newsLetterJob.forEach((news) => {
      body += `\n\n${this.buildTitle(news)}
  <p>${news.description}</p>`;
      return body;
    });
    return body;
  }
  buildTitle(news: NewsletterEntity) {
    return news.link
      ? `<h3><a href="${news.link}">${news.title}</a></h3`
      : `<h3>${news.title}</h3`;
  }
}
