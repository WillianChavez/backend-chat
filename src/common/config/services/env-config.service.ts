import { Injectable, Inject } from '@nestjs/common';
import base from '../env-config/base';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(@Inject(base.KEY) public variables: ConfigType<typeof base>) {}

  get pathDB(): string {
    return `${this.variables.db.dialect}://${this.variables.db.username}:${this.variables.db.password}@${this.variables.db.host}`;
  }

  get path(): string {
    return `${this.variables.host}:${this.variables.port}`;
  }
}
