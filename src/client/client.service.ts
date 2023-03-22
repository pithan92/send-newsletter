import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateClientDto from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}
  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }

  findAll(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  findOne(email: string) {
    return this.clientRepository.findOne({
      where: { email },
    });
  }

  update(email: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update({ email }, updateClientDto);
  }

  remove(email: string) {
    return this.clientRepository.delete(email);
  }
}
