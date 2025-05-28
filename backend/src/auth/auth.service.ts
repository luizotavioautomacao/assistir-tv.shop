import { Injectable } from '@nestjs/common';
import { JweService } from '../common/crypto/jwe.service';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { DecryptDto } from './dto/decrypt.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jweService: JweService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const hashedPassword = await bcrypt.hash(loginDto.password, 10);
    const payload = {
      email: loginDto.email,
      timestamp: new Date().toISOString(),
    };

    const jwe = await this.jweService.encrypt(payload);

    await this.authRepository.create({
      email: loginDto.email,
      password: hashedPassword,
      jwe,
    });

    return jwe;
  }

  async decrypt(decryptDto: DecryptDto): Promise<any> {
    return this.jweService.decrypt(decryptDto.jwe);
  }

  async getHistory(): Promise<any[]> {
    const logins = await this.authRepository.findAll();
    return logins.map(login => ({
      email: login.email,
      createdAt: login.createdAt,
      jwe: login.jwe,
    }));
  }
} 