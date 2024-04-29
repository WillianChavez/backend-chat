import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import base from './env-config/base';
import { validate } from './validators/env.validation';
import { archivosEnv } from './env-config/enviroments';
import { EnvConfigService } from './services/env-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [base],
      validate,
      envFilePath: archivosEnv[process.env.APP_ENV] || '.env',
    }),
    ConfigModule,
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class envModule {}
