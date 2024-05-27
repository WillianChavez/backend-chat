import { Injectable } from '@nestjs/common';
import { SequelizeOptionsFactory, SequelizeModuleOptions } from '@nestjs/sequelize';
import { EnvConfigService } from 'src/common/config/services/env-config.service';

@Injectable()
export class SequelizeOptions implements SequelizeOptionsFactory {
  constructor(private readonly envConfigService: EnvConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      ...this.envConfigService.variables.db,
      autoLoadModels: true,
      synchronize: true,
      models: [__dirname + '/../models/*.model.{ts,js}'],
    };
  }
}
