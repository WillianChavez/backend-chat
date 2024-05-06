import { MailerOptions } from '@nestjs-modules/mailer';

export const config: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT as unknown as number,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  },
  defaults: {
    from: process.env.MAIL_FROM
  }
};