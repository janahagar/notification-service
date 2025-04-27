// src/notifications/notifications.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ServerClient } from 'postmark';
import { ConfigService } from '../config/config.service';
import { SendEmailDto } from './dto/send-email.dto';
import * as pug from 'pug';
import { SendRideCanceledEmailDto } from './dto/SendRideCanceledEmailDto';
import { SendRideUpdateEmailDto } from './dto/SendRideUpdateEmailDto';
import { SendReminderEmailDto } from './dto/send-reminder-email.dto';

@Injectable()
export class NotificationsService {
  private readonly client: ServerClient;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private configService: ConfigService) {
    this.client = new ServerClient(
      this.configService.get('POSTMARK_API_TOKEN'),
    );
  }

  async handleNotification(sendEmailDto: SendEmailDto): Promise<void> {
    let html;
    try {
      switch (sendEmailDto.type) {
        case 'booking': //Done
          html = pug.renderFile(
            'src/notifications/templates/booking.pug',
            sendEmailDto.payload,
          );
          break;
        case 'rideUpdate':
          // For single recipient ride updates
          html = pug.renderFile(
            'src/notifications/templates/rideUpdate.pug',
            sendEmailDto.payload,
          );
          break;
        case 'rideCanceled':
          // Render the cancellation email using Pug and the provided payload
          html = pug.renderFile(
            'src/notifications/templates/rideCanceled.pug',
            sendEmailDto.payload,
          );
          break;
        // Add cases for other types of emails if needed
        case 'bookingCancellation': //Done
          html = pug.renderFile(
            'src/notifications/templates/bookingCancellation.pug',
            sendEmailDto.payload,
          );
          break;
        case 'adminAlert':
          html = pug.renderFile(
            'src/notifications/templates/adminAlert.pug',
            sendEmailDto.payload,
          );
          break;
        case 'welcome':
          html = pug.renderFile(
            'src/notifications/templates/welcome.pug',
            sendEmailDto.payload,
          );
          break;
        case 'reminder':
          html = pug.renderFile(
            'src/notifications/templates/sendReminderNotification.pug',
            sendEmailDto.payload,
          );
          break;
        default:
          throw new Error('Unsupported notification type');
      }

      const email = {
        From: `"Car Pooling" <${this.configService.get('POSTMARK_SENDER_EMAIL')}>`,
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
  // Method to handle ride cancellation notifications (Done)
  async handleCancelNot(sendEmailDto: SendRideCanceledEmailDto): Promise<void> {
    let html;
    try {
      // Render the cancellation email using Pug and the provided payload
      html = pug.renderFile(
        'src/notifications/templates/rideCanceled.pug',
        sendEmailDto.payload,
      );

      // Join the email addresses for multiple recipients
      const emailAddresses = sendEmailDto.to.join(', '); // Assuming 'to' is an array of emails

      const email = {
        From: `"Car Pooling" <${this.configService.get('POSTMARK_SENDER_EMAIL')}>`,
        To: emailAddresses, // Send to all recipients
        Subject: sendEmailDto.subject,
        HtmlBody: html,
      };

      await this.client.sendEmail(email);
      this.logger.log(
        `Ride cancellation email sent successfully to ${emailAddresses}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send ride cancellation email to ${sendEmailDto.to}: ${error}`,
      );
    }
  }

  // Method to handle ride update notifications for multiple recipients
  async handleRideUpdate(sendEmailDto: SendRideUpdateEmailDto): Promise<void> {
    let html;
    try {
      // Render the ride update email using Pug and the provided payload
      html = pug.renderFile(
        'src/notifications/templates/rideUpdate.pug',
        sendEmailDto.payload,
      );

      // Join the email addresses for multiple recipients
      const emailAddresses = sendEmailDto.to.join(', '); // 'to' is an array of emails

      const email = {
        From: `"Car Pooling" <${this.configService.get('POSTMARK_SENDER_EMAIL')}>`,
        To: emailAddresses, // Send to all recipients
        Subject: sendEmailDto.subject,
        HtmlBody: html,
      };

      await this.client.sendEmail(email);
      this.logger.log(
        `Ride update email sent successfully to ${emailAddresses}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send ride update email to ${sendEmailDto.to}: ${error}`,
      );
    }
  }

  // Method to handle ride reminder notifications for multiple recipients
  async handleRideReminder(reminderDto: SendReminderEmailDto): Promise<void> {
    let html;
    try {
      // Render the ride reminder email using Pug and the provided payload
      html = pug.renderFile(
        'src/notifications/templates/sendReminderNotification.pug',
        reminderDto.payload,
      );

      // Join the email addresses for multiple recipients
      const emailAddresses = reminderDto.to.join(', ');

      const email = {
        From: `"Car Pooling" <${this.configService.get('POSTMARK_SENDER_EMAIL')}>`,
        To: emailAddresses, // Send to all recipients
        Subject: reminderDto.subject,
        HtmlBody: html,
      };

      await this.client.sendEmail(email);
      this.logger.log(
        `Ride reminder email sent successfully to ${emailAddresses}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send ride reminder email to ${reminderDto.to}: ${error}`,
      );
    }
  }

// async sendReminderNotification(ride: Ride): Promise<void> {
//   const reminderEmail = {
//     From: '"Car Pooling" <' + this.configService.get('POSTMARK_SENDER_EMAIL') + '>',
//     To: ride.passengerEmail,
//     Subject: 'Reminder: Your Ride is Starting in 15 Minutes',
//     HtmlBody: `<p>Hello, ${ride.passengerName}, your ride from ${ride.fromPlace} to ${ride.toPlace} is starting in 15 minutes. Please be ready!</p>`,
//   };

//   await this.client.sendEmail(reminderEmail);
// }

}
