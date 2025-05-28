import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/auth.repository';
import { Login } from 'src/entities/login.entity';

describe('AuthRepository', () => {
  let repository: AuthRepository;
  let loginRepoMock: jest.Mocked<Repository<Login>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRepository,
        {
          provide: getRepositoryToken(Login),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<AuthRepository>(AuthRepository);
    loginRepoMock = module.get(getRepositoryToken(Login));
  });

  describe('create', () => {
    it('deve criar e salvar um novo login', async () => {
      const loginData = { email: 'user@example.com', password: '123456' } as Partial<Login>;
      const createdLogin = { ...loginData, id: '1', createdAt: new Date() } as Login;

      loginRepoMock.create.mockReturnValue(createdLogin);
      loginRepoMock.save.mockResolvedValue(createdLogin);

      const result = await repository.create(loginData);

      expect(loginRepoMock.create).toHaveBeenCalledWith(loginData);
      expect(loginRepoMock.save).toHaveBeenCalledWith(createdLogin);
      expect(result).toEqual(createdLogin);
    });
  });

  describe('findAll', () => {
    it('deve retornar a lista de logins ordenada por createdAt DESC', async () => {
      const mockLogins = [
        { id: '2', createdAt: new Date(), email: 'b@example.com' },
        { id: '1', createdAt: new Date(), email: 'a@example.com' },
      ] as Login[];

      loginRepoMock.find.mockResolvedValue(mockLogins);

      const result = await repository.findAll();

      expect(loginRepoMock.find).toHaveBeenCalledWith({
        order: {
          createdAt: 'DESC',
        },
      });
      expect(result).toEqual(mockLogins);
    });
  });
});
