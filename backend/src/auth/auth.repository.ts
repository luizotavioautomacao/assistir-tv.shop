import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from '../entities/login.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
  ) {}

  async create(login: Partial<Login>): Promise<Login> {
    const newLogin = this.loginRepository.create(login);
    return this.loginRepository.save(newLogin);
  }

  async findAll(): Promise<Login[]> {
    return this.loginRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
} 