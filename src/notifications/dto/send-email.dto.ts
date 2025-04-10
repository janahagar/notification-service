export class SendEmailDto {
  type: string;  // Type of the email, e.g., "rideUpdate"
  to: string;    // The recipient's email address
  subject: string;  // Email subject
  payload: {
    username: string;  // Dynamic: Username for the email
    date: string;  // Dynamic: Date of the ride
    fromPlace: string;  // Dynamic: Ride origin (from where the ride starts)
    toPlace: string;  // Dynamic: Ride destination (where the ride ends)
    details:string;
    issueType :string;
  };
}
