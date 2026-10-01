export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailService {
  sendEmail(payload: EmailPayload): Promise<boolean>;
}

export class ConsoleEmailAdapter implements EmailService {
  async sendEmail(payload: EmailPayload): Promise<boolean> {
    console.log('--- MOCK EMAIL SENT ---');
    console.log(`To: ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`HTML:\n${payload.html}`);
    console.log('-----------------------');
    return true;
  }
}

export class ResendEmailAdapter implements EmailService {
  async sendEmail(payload: EmailPayload): Promise<boolean> {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return false;
    }
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'bookings@hotelratnawali.com',
          to: payload.to,
          subject: payload.subject,
          html: payload.html
        })
      });
      if (!res.ok) {
        console.error('Failed to send email via Resend:', await res.text());
        return false;
      }
      return true;
    } catch (e) {
      console.error('Exception sending email:', e);
      return false;
    }
  }
}

export const emailService: EmailService = 
  process.env.NODE_ENV === 'production' && process.env.RESEND_API_KEY
    ? new ResendEmailAdapter()
    : new ConsoleEmailAdapter();
