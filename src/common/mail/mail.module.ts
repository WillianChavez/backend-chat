import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { config as MailConfig } from './config';

@Module({
  imports: [
    MailerModule.forRoot(MailConfig)
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
