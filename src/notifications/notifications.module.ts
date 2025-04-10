import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService, ConfigService],
})
export class NotificationsModule {}
