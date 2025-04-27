import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendReminderEmailDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsEmail({}, { each: true })
  to: string[];

  @IsString()
  @IsNotEmpty()
  subject: string;

  payload: {
    passengerName: string;
    fromPlace: string;
    toPlace: string;
    departureTime: string;
  };
}
