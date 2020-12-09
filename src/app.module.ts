import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { ListingController } from './modules/listing/listing.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ListingController, AuthController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('BCKND_PORT');
  }
}
