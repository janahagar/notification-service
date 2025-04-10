import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigService } from './config/config.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [NotificationsModule],
  controllers: [],
  providers: [ConfigService], // Add ConfigService here
})
export class AppModule {}
