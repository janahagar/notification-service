// src/notifications/notifications.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ServerClient } from "postmark";
import { ConfigService } from '../config/config.service';
import { SendEmailDto } from './dto/send-email.dto';
import * as pug from 'pug';

@Injectable()
export class NotificationsService {
  private readonly client: ServerClient;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private configService: ConfigService) {
    this.client = new ServerClient(this.configService.get('POSTMARK_API_TOKEN'));
  }

  async handleNotification(sendEmailDto: SendEmailDto): Promise<void> {
    let html;
    try {
      switch (sendEmailDto.type) {
        case 'booking':
          html = pug.renderFile(`src/notifications/templates/booking.pug`, sendEmailDto.payload);
          break;
        case 'rideUpdate':
          html = pug.renderFile(`src/notifications/templates/rideUpdate.pug`, sendEmailDto.payload);
          break;
        case 'adminAlert':
          html = pug.renderFile(`src/notifications/templates/adminAlert.pug`, sendEmailDto.payload);
          break;
        case 'welcome':
          html = pug.renderFile(`src/notifications/templates/welcome.pug`, sendEmailDto.payload);
          break;
        default:
          throw new Error('Unsupported notification type');
      }

      const email = {
        From: '"Car Pooling" <' + this.configService.get('POSTMARK_SENDER_EMAIL') + '>',  // Hide the actual email address
        To: sendEmailDto.to,
        Subject: sendEmailDto.subject,
        HtmlBody: html,
      };
      
      

      await this.client.sendEmail(email);
      this.logger.log(`Email sent successfully to ${sendEmailDto.to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${sendEmailDto.to}: ${error}`);
      // Handle specific errors or rethrow them if needed
    }
  }
}
