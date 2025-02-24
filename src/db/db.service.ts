import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read() {
    const filePath = this.options.path;

    try {
      await access(filePath);
    } catch (e) {
      console.error(e);
      return [];
    }

    const content = await readFile(filePath, {
      encoding: 'utf-8',
    });

    if (!content) {
      return [];
    }

    return JSON.parse(content) as [];
  }

  async write(data: Record<string, any>) {
    const filePath = this.options.path;

    await writeFile(filePath, JSON.stringify(data || []), {
      encoding: 'utf-8',
    });
  }
}
