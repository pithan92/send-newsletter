import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'newsletter' })
export class NewsletterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  processed?: boolean;

  constructor(newsletterDto?: Partial<NewsletterEntity>) {
    this.id = newsletterDto?.id;
    this.title = newsletterDto?.title;
    this.description = newsletterDto?.description;
    this.link = newsletterDto?.link;
    this.processed = newsletterDto?.processed;
  }
}
