import { Module } from '@nestjs/common';
import { EnvConfigService } from '../config/services/env-config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from './providers/database.provider';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeOptions,
      inject: [EnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
