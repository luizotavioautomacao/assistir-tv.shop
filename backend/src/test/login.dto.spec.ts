// login.dto.spec.ts
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from 'src/auth/dto/login.dto';


describe('LoginDto', () => {
  it('deve ser válido com email e senha corretos', async () => {
    const dto = plainToInstance(LoginDto, {
      email: 'valid@email.com',
      password: '123456',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido com email mal formatado', async () => {
    const dto = plainToInstance(LoginDto, {
      email: 'invalid-email',
      password: '123456',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('deve ser inválido com senha muito curta', async () => {
    const dto = plainToInstance(LoginDto, {
      email: 'user@email.com',
      password: '12345',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });
});
