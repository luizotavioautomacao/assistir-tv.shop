import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { DecryptDto } from './dto/decrypt.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user and generate JWE' })
  @ApiResponse({ status: 200, description: 'Returns the generated JWE' })
  async login(@Body() loginDto: LoginDto): Promise<{ jwe: string }> {
    const jwe = await this.authService.login(loginDto);
    return { jwe };
  }

  @Post('decrypt')
  @ApiOperation({ summary: 'Decrypt JWE' })
  @ApiResponse({ status: 200, description: 'Returns the decrypted data' })
  async decrypt(@Body() decryptDto: DecryptDto): Promise<any> {
    return this.authService.decrypt(decryptDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get login history' })
  @ApiResponse({ status: 200, description: 'Returns the login history' })
  async getHistory(): Promise<any[]> {
    return this.authService.getHistory();
  }
} 