import { LoggerService } from '@nestjs/common';
import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
} from 'winston';

export class Logger implements LoggerService {
  private readonly logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(format.colorize(), format.simple()),
      transports: [new transports.Console()],
    });
  }

  log(message: string, context?: string) {
    this.logger.log('info', `[${context}] ${message}`);
  }

  error(message: string, context?: string) {
    this.logger.log('error', `[${context}] ${message}`);
  }

  warn(message: string, context?: string) {
    this.logger.log('warn', `[${context}] ${message}`);
  }
}
