// src/config/config.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string } = process.env;

  get(key: string): string {
    return this.envConfig[key];
  }
}
