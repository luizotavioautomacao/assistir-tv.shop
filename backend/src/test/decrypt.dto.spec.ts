// decrypt.dto.spec.ts
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { DecryptDto } from 'src/auth/dto/decrypt.dto';

describe('DecryptDto', () => {
  it('deve ser válido com JWE em string', async () => {
    const dto = plainToInstance(DecryptDto, {
      jwe: 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ...',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser inválido se JWE não for string', async () => {
    const dto = plainToInstance(DecryptDto, {
      jwe: 123456, // número em vez de string
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('jwe');
  });
});
