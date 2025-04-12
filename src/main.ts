import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service'; // Make sure it's your own ConfigService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService); // Ensure this is your custom ConfigService
  console.log({api: configService.get('POSTMARK_API_TOKEN')},)
  await app.listen(3000);
 
}
bootstrap();
