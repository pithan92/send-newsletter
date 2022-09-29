import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import CreateClientDto from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const { name, email, birthDay } = createClientDto;
    try {
      const newClient = new CreateClientDto(name, email, birthDay);
      return await this.clientService.create(newClient);
    } catch (e) {
      return e?.detail || e?.message;
    }
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.clientService.findOne(email);
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      return await this.clientService.update(email, updateClientDto);
    } catch (e) {
      return e?.detail || e?.message;
    }
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.clientService.remove(email);
  }
}
