import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const BACKEND_PORT = configService.get<number>('BACKEND_PORT');
  const FRONTEND_PORT = configService.get<number>('FRONTEND_PORT');

  if (!BACKEND_PORT) {
    logger.warn('⚠️ BACKEND_PORT não foi definido no arquivo .env!');
  }

  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('The authentication API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

   app.enableCors({
    // origin: `http://localhost:${FRONTEND_PORT}`, 
    origin: '*', // qualquer requisição
    credentials: true,
  });

  await app.listen(BACKEND_PORT);
  console.log(`🚀 Application is running on: http://localhost:${BACKEND_PORT}`);
}
bootstrap();
