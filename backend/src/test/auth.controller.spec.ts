import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { DecryptDto } from 'src/auth/dto/decrypt.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn(),
      decrypt: jest.fn(),
      getHistory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /auth/login', () => {
    it('should call AuthService.login and return JWE', async () => {
      const dto: LoginDto = {
        email: 'user@example.com',
        password: 'password123',
      };

      authService.login.mockResolvedValue('mocked-jwe');

      const result = await controller.login(dto);
      expect(authService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ jwe: 'mocked-jwe' });
    });
  });

  describe('POST /auth/decrypt', () => {
    it('should call AuthService.decrypt and return payload', async () => {
      const dto: DecryptDto = { jwe: 'some-jwe-token' };
      const mockDecrypted = { email: 'user@example.com' };

      authService.decrypt.mockResolvedValue(mockDecrypted);

      const result = await controller.decrypt(dto);
      expect(authService.decrypt).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockDecrypted);
    });
  });

  describe('GET /auth/history', () => {
    it('should return login history', async () => {
      const mockHistory = [
        { email: 'a@a.com', createdAt: new Date(), jwe: 'token1' },
        { email: 'b@b.com', createdAt: new Date(), jwe: 'token2' },
      ];

      authService.getHistory.mockResolvedValue(mockHistory);

      const result = await controller.getHistory();
      expect(authService.getHistory).toHaveBeenCalled();
      expect(result).toEqual(mockHistory);
    });
  });
});

// 🧪 O que está sendo testado:
// POST /auth/login	    Chama authService.login() e retorna { jwe } corretamente
// POST /auth/decrypt	Chama authService.decrypt() com o JWE
// GET  /auth/history	Chama authService.getHistory() e retorna o histórico