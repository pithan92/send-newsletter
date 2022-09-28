import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryColumn()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  birthDay?: string;
}
