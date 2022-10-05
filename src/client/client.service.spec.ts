import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from './client.service';
import { ClientEntity } from './entities/client.entity';

const clientEntityList: ClientEntity[] = [
  new ClientEntity({
    name: 'paulo',
    email: 'paulo@teste.com',
    birthDay: '20/10/2000',
  }),
  new ClientEntity({
    name: 'paulo1',
    email: 'paulo1@teste.com',
    birthDay: '20/10/2000',
  }),
  new ClientEntity({
    name: 'paulo2',
    email: 'paulo2@teste.com',
    birthDay: '20/10/2000',
  }),
];

describe('ClientService', () => {
  let clientService: ClientService;
  let clientRepository: Repository<ClientEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(ClientEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(clientEntityList),
            findOne: jest.fn().mockResolvedValue(clientEntityList[0]),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a list client entity successfully', async () => {
      const result = await clientService.findAll();

      expect(result).toEqual(clientEntityList);
      expect(clientRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(clientRepository, 'find').mockRejectedValueOnce(new Error());

      expect(clientService.findAll()).rejects.toThrowError();
    });
  });
  describe('findOne', () => {
    it('should return one client entity successfully', async () => {
      const result = await clientService.findOne('paulo@teste.com');
      expect(result).toEqual(clientEntityList[0]);
      expect(clientRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return null', () => {
      jest.spyOn(clientRepository, 'findOne').mockReturnValueOnce(null);

      expect(clientService.findOne('paulo@tete.com')).toEqual(null);
    });
  });
});
