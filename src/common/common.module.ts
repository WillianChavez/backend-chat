import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { envModule } from './config/env.module';
import { StorageModule } from './storage/storage.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [envModule, DatabaseModule, StorageModule, MailModule],
})
export class CommonModule {}
