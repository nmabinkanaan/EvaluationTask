import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Quiz maneger API')
    .setDescription('Quiz maneger API description')
    .setVersion('1.0')
    .addSecurity('jwt', {
      type: 'http',
      scheme: 'bearer'
    })
    .build();

  // forceStylePath: true
  // access = 5prYLlqQ5XpLFMEHR1QW
  // secret = wtVyfOBT2d2Ctlmqz7ounlJHS2z7NUQbsWSe0HJx
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
