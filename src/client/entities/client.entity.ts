import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'client' })
export class ClientEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  birthDay?: string;

  constructor(clientDto?: Partial<ClientEntity>) {
    this.email = clientDto?.email;
    this.birthDay = clientDto?.birthDay;
    this.name = clientDto?.name;
  }
}
