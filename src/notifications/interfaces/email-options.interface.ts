export interface EmailOptions {
  to: string;            // Recipient's email address
  subject: string;       // Email subject
  html: string;          // HTML content of the email
  username?: string;     // Optional: Username for dynamic content (e.g., welcome)
  date?: string;         // Optional: Date for dynamic content (e.g., booking date)
  from?: string;     // Optional: Booking 'from' time
  toplace?: string;       // Optional: Booking 'to' time
  details?:string;
    issueType? :string;
}
