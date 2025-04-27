import { Controller, Post, Body, HttpCode, HttpStatus, Res, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendRideCanceledEmailDto } from './dto/SendRideCanceledEmailDto';
import { SendRideUpdateEmailDto } from './dto/SendRideUpdateEmailDto';
import { SendReminderEmailDto } from './dto/send-reminder-email.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('/notify')
  async notify(
    @Body() sendEmailDto: SendEmailDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.notificationsService.handleNotification(sendEmailDto);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Notification sent successfully!' });
    } catch (error) {
      throw new HttpException(
        'Failed to send notification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @Post('/notifyCancelRide')
  async notify2(
    @Body() sendD: SendRideCanceledEmailDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.notificationsService.handleCancelNot(sendD);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Notification sent successfully!' });
    } catch (error) {
      throw new HttpException(
        'Failed to send notification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @Post('/notifyRideUpdate')
  async notifyRideUpdate(
    @Body() updateDto: SendRideUpdateEmailDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.notificationsService.handleRideUpdate(updateDto);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Ride update notification sent successfully!' });
    } catch (error) {
      throw new HttpException(
        'Failed to send ride update notification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @Post('/notifyRideReminder')
  async notifyRideReminder(
    @Body() reminderDto: SendReminderEmailDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.notificationsService.handleRideReminder(reminderDto);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Ride reminder notification sent successfully!' });
    } catch (error) {
      throw new HttpException(
        'Failed to send ride reminder notification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
