import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { envModule } from './config/env.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    envModule,
    DatabaseModule,
    StorageModule
  ],
})
export class CommonModule { }
