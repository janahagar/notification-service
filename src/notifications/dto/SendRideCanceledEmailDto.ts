export class SendRideCanceledEmailDto {
    type: string;  // Type of the email, e.g., "rideCanceled"
    to: string[];  // List of recipients (riders' email addresses)
    subject: string;  // Email subject, e.g., "Your Ride Has Been Canceled"
    payload: {
      
      date: string;  // Dynamic: Date of the canceled ride
      fromPlace: string;  // Dynamic: Origin of the ride (from place)
      toPlace: string;  // Dynamic: Destination of the ride (to place)
    };
  }
  