import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
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
describe('ClientController', () => {
  let clientController: ClientController;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn().mockReturnValue(clientEntityList),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    clientController = module.get<ClientController>(ClientController);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(clientController).toBeDefined();
    expect(clientService).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a client entity sucessfully', async () => {
      const result = await clientService.findAll();

      expect(result).toEqual(clientEntityList);
      expect(clientService.findAll).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', () => {
      jest.spyOn(clientService, 'findAll').mockRejectedValueOnce(new Error());
      expect(clientController.findAll()).rejects.toThrowError();
    });
  });
});
