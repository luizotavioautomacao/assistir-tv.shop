import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDto {
  @ApiProperty({ example: 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ...' })
  @IsString()
  jwe: string;
} 