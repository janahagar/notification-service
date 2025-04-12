import { Controller, Post, Body, HttpCode, HttpStatus, Res, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendRideCanceledEmailDto } from './dto/SendRideCanceledEmailDto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('/notify')
  async notify(@Body() sendEmailDto: SendEmailDto, @Res() res: Response): Promise<Response> {
    try {
      await this.notificationsService.handleNotification(sendEmailDto);
      return res.status(HttpStatus.OK).json({ message: 'Notification sent successfully!' });
    } catch (error) {
      throw new HttpException('Failed to send notification', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/notifyCancelRide')
  async notify2(@Body() sendD: SendRideCanceledEmailDto, @Res() res: Response): Promise<Response> {
    try {
      await this.notificationsService.handleCancelNot(sendD);
      return res.status(HttpStatus.OK).json({ message: 'Notification sent successfully!' });
    } catch (error) {
      throw new HttpException('Failed to send notification', HttpStatus.BAD_REQUEST);
    }
  }
  
  
}
