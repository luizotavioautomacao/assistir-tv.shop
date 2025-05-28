import { JweService } from 'src/common/crypto/jwe.service';

describe('JweService', () => {
  let service: JweService;

  beforeEach(async () => {
    service = new JweService();
    await service.onModuleInit(); // Garante que as chaves sejam geradas
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt and decrypt a payload', async () => {
    const payload = { email: 'test@example.com', role: 'user' };

    const jwe = await service.encrypt(payload);
    expect(typeof jwe).toBe('string');

    const decrypted = await service.decrypt(jwe);
    expect(decrypted).toMatchObject(payload);
  });

  it('should throw an error when trying to decrypt invalid token', async () => {
    await expect(service.decrypt('invalid-token')).rejects.toThrow();
  });

  it('should throw an error if public key is not initialized (simulate)', async () => {
    const tempService = new JweService();
    // NÃO chama onModuleInit()
    await expect(tempService.encrypt({ test: 'data' })).rejects.toThrow('Public key not initialized');
  });

  it('should throw an error if private key is not initialized (simulate)', async () => {
    const tempService = new JweService();
    // NÃO chama onModuleInit()
    await expect(tempService.decrypt('some-jwe')).rejects.toThrow('Private key not initialized');
  });
});

// | Teste                                                       | Coberto?  | Observação                         |
// | ----------------------------------------------------------- | --------- | ---------------------------------- |
// | Instanciação do serviço (`should be defined`)               | ✅        | Básico, mas importante             |
// | Criptografia + Descriptografia completa (`encrypt/decrypt`) | ✅        | Verifica ida e volta da informação |
// | Token inválido (`decrypt('invalid-token')`)                 | ✅        | Teste de erro por dado malformado  |
// | Erro por falta de chave pública (`encrypt` sem init)        | ✅        | Simula falha de inicialização      |
// | Erro por falta de chave privada (`decrypt` sem init)        | ✅        | Outro cenário realista de falha    |
