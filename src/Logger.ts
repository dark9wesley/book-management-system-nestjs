import { LoggerService } from '@nestjs/common';
import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
} from 'winston';
import * as dayjs from 'dayjs';
import * as chalk from 'chalk';

export class Logger implements LoggerService {
  private readonly logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context as string}]`);

              const splitStr = chalk.gray('-');

              return `${appStr} ${splitStr} ${time as string} ${splitStr} ${contextStr} ${level} ${message as string}`;
            }),
          ),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, {
      time,
      context,
    });
  }

  error(message: string, context?: string) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('error', message, {
      time,
      context,
    });
  }

  warn(message: string, context?: string) {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('warn', message, {
      time,
      context,
    });
  }
}
