import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ListingModule } from '@modules/listing/listing.module';
import { AuthModule } from '@modules/auth/auth.module';
import { DatabaseModule } from '@db/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    ListingModule,
  ],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('BCKND_PORT');
  }
}
