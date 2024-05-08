import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendTextMail(to: string, subject: string, text: string) {
    return await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }
}
