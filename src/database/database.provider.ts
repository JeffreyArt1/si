import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

async function createOrmConfigFile(databaseCfg: ConnectionOptions) {
  const path = join(__dirname, '../../');
  writeFileSync(path + 'ormconfig.json', JSON.stringify(databaseCfg, null, 2));
}

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],

  async useFactory(cfg: ConfigService) {
    const devMode = cfg.get('BCKND_ENV0') !== 'production';
    const databaseCfg = {
      type: 'postgres',
      host: cfg.get('DTBS_HOST'),
      username: cfg.get('DTBS_USER'),
      password: cfg.get('DTBS_PSWD'),
      port: +cfg.get('DTBS_PORT'),
      database: cfg.get('DTBS_NAME'),
      autoLoadEntities: true,
      synchronize: devMode,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/database/migrations/*.js'],
      cli: { migrationsDir: 'src/database/migrations' },
      logging: cfg.get('DTBS_LOGS'),
    } as ConnectionOptions;

    if (devMode) createOrmConfigFile(databaseCfg);

    return databaseCfg;
  },
});
