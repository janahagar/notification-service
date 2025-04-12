import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';
// import { RideService } from './ride.service';  // Service for managing rides

@Injectable()
 export class ReminderService {
//   constructor(
//     private readonly notificationsService: NotificationsService,
//     private readonly rideService: RideService,
//   ) {}

//   @Cron('0 * * * * *')  // Runs every minute (can be adjusted)
//   async sendRideReminder() {
//     const rides = await this.rideService.getUpcomingRides();  // Fetch rides within the next 15 minutes

//     rides.forEach(ride => {
//       const currentTime = new Date();
//       const reminderTime = new Date(ride.startTime).getTime() - 15 * 60 * 1000; // 15 minutes before

//       if (currentTime.getTime() >= reminderTime) {
//         // Send reminder notification to passenger and driver
//         this.notificationsService.sendReminderNotification(ride);
//       }
//     });
//   }
 }
