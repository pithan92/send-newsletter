import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { NewsletterEntity } from './entities/newsletter.entity';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterEntity)
    private newsletterRepository: Repository<NewsletterEntity>,
  ) {}

  async create(createNewsletterDto: CreateNewsletterDto) {
    const { title, description, link } = createNewsletterDto;
    const newNews: Partial<NewsletterEntity> = {
      title,
      description,
      link,
      processed: false,
    };
    return await this.newsletterRepository.save(newNews);
  }

  findAll(): Promise<NewsletterEntity[]> {
    return this.newsletterRepository.find();
  }

  findOne(id: string) {
    return this.newsletterRepository.findOne({
      where: { id },
    });
  }
  findJobForEmail() {
    return this.newsletterRepository.find({
      where: { processed: false },
    });
  }
  update(id: string, updateNewsletterDto: UpdateNewsletterDto) {
    const { title, description, link, processed } = updateNewsletterDto;
    const updateNews: Partial<NewsletterEntity> = {
      title,
      description,
      link,
      processed,
    };
    return this.newsletterRepository.update({ id }, updateNews);
  }

  remove(id: string) {
    return this.newsletterRepository.delete(id);
  }
}
