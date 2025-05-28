import { AuthService } from 'src/auth/auth.service';
import { JweService } from 'src/common/crypto/jwe.service';
import { AuthRepository } from 'src/auth/auth.repository';
import { LoginDto } from 'src/auth/dto/login.dto';
import { DecryptDto } from 'src/auth/dto/decrypt.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService;
    let jweService: jest.Mocked<JweService>;
    let authRepository: jest.Mocked<AuthRepository>;

    beforeEach(() => {
        jweService = {
            encrypt: jest.fn(),
            decrypt: jest.fn(),
        } as any;

        authRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
        } as any;

        service = new AuthService(jweService, authRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        it('should hash password, create JWE, store login and return token', async () => {
            const loginDto: LoginDto = {
                email: 'user@example.com',
                password: 'secure123',
            };

            const mockHashedPassword = 'hashed-password';
            const mockJwe = 'encrypted-jwe';

            (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
            jweService.encrypt.mockResolvedValue(mockJwe);

            const result = await service.login(loginDto);

            expect(bcrypt.hash).toHaveBeenCalledWith('secure123', 10);
            expect(jweService.encrypt).toHaveBeenCalledWith(expect.objectContaining({
                email: 'user@example.com',
            }));
            expect(authRepository.create).toHaveBeenCalledWith({
                email: 'user@example.com',
                password: mockHashedPassword,
                jwe: mockJwe,
            });
            expect(result).toBe(mockJwe);
        });
    });

    describe('decrypt', () => {
        it('should call jweService.decrypt with the given JWE', async () => {
            const dto: DecryptDto = { jwe: 'some-jwe-token' };
            const decrypted = { email: 'user@example.com' };

            jweService.decrypt.mockResolvedValue(decrypted);

            const result = await service.decrypt(dto);

            expect(jweService.decrypt).toHaveBeenCalledWith('some-jwe-token');
            expect(result).toEqual(decrypted);
        });
    });

    describe('getHistory', () => {
        it('should return formatted login history', async () => {
            const mockLogins = [
                {
                    id: 'uuid-1',
                    email: 'a@a.com',
                    password: 'hashed',
                    jwe: 'jwe1',
                    createdAt: new Date('2024-01-01'),
                },
                {
                    id: 'uuid-2',
                    email: 'b@b.com',
                    password: 'hashed',
                    jwe: 'jwe2',
                    createdAt: new Date('2024-02-01'),
                },
            ];


            authRepository.findAll.mockResolvedValue(mockLogins);

            const result = await service.getHistory();

            expect(authRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual([
                {
                    email: 'a@a.com',
                    jwe: 'jwe1',
                    createdAt: new Date('2024-01-01'),
                },
                {
                    email: 'b@b.com',
                    jwe: 'jwe2',
                    createdAt: new Date('2024-02-01'),
                },
            ]);
        });
    });
});

// | Método       | Verificação                                                            |
// | ------------ | ---------------------------------------------------------------------- |
// | `login`      | Hasheia senha, gera JWE, salva no repositório e retorna o token        |
// | `decrypt`    | Chama `jweService.decrypt()` com o JWE correto                         |
// | `getHistory` | Retorna histórico de logins com os campos `email`, `jwe` e `createdAt` |

