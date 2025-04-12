import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigService } from '../config/config.service';
import { ReminderService } from './reminder.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService, ConfigService,ReminderService],
})
export class NotificationsModule {}
