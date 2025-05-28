import {
  Injectable,                  // marca a classe como um serviço injetável no NestJS.
  OnModuleInit                 // interface que permite executar código assim que o módulo do Nest é carregado.
} from '@nestjs/common';     
import {     
  EncryptJWT, jwtDecrypt,      // métodos para gerar e descriptografar tokens JWE.
  generateKeyPair,             // gera um par de chaves públicas/privadas.
  KeyLike                      // tipo que representa chaves compatíveis com a lib jose.
} 
  from 'jose';

@Injectable()
export class JweService implements OnModuleInit {
  private publicKey: KeyLike;  // publicKey e privateKey armazenam as chaves geradas.
  private privateKey: KeyLike; // KeyLike permite usar diferentes formatos de chave (como KeyObject, CryptoKey, etc.)

  async onModuleInit() {       // onModuleInit() é chamado automaticamente após a injeção de dependências.
    const { publicKey, privateKey } = await generateKeyPair('RSA-OAEP', {
      modulusLength: 2048,     // gera um par de chaves RSA de 2048 bits.
    });

    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  async encrypt(payload: Record<string, any>): Promise<string> {
    if (!this.publicKey) {
      throw new Error('Public key not initialized');
    }
    // Cria um token JWE com o conteúdo de payload.
    const jwe = await new EncryptJWT(payload)
      .setProtectedHeader({
        alg: 'RSA-OAEP',        // RSA-OAEP: algoritmo assimétrico para criptografar a chave de sessão.
        enc: 'A256GCM'          // A256GCM: algoritmo simétrico para criptografar o conteúdo real.
      })
      .setIssuedAt()            // setIssuedAt() e setExpirationTime('2h'): definem o tempo de validade do token.
      .setExpirationTime('2h')
      .encrypt(this.publicKey); // encrypt(this.publicKey): usa a chave pública para criptografar.

    return jwe;
  }
  // Descriptografa um token JWE com a chave privada.
  async decrypt(jwe: string): Promise<any> {
    if (!this.privateKey) {
      throw new Error('Private key not initialized');
    }

    const { payload } = await jwtDecrypt(jwe, this.privateKey); // retorna o conteúdo original.
    return payload;             // Retorna apenas o payload (os dados embutidos no JWE).
  }
}
