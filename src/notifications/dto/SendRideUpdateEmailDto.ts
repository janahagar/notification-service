export class SendRideUpdateEmailDto {
  type: string; // Type of the email, e.g., "rideUpdate"
  to: string[]; // List of recipients (riders' email addresses)
  subject: string; // Email subject, e.g., "Your Ride Has Been Updated"
  payload: {
    date: string; // Dynamic: Date of the updated ride
    fromPlace: string; // Dynamic: Origin of the ride (from place)
    toPlace: string; // Dynamic: Destination of the ride (to place)
    details: string; // Dynamic: Details about the update
  };
}