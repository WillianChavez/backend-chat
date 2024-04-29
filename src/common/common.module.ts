import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { envModule } from './config/env.module';

@Module({
  imports: [envModule, DatabaseModule],
})
export class CommonModule {}
