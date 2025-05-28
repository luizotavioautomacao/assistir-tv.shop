import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JweService } from '../common/crypto/jwe.service';
import { Login } from '../entities/login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Login])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JweService],
})
export class AuthModule {} 