import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendgridMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendgridMail.setApiKey(configService.get('SNGRD_APIK'));
  }

  async sendEmail(options: SendgridMail.MailDataRequired) {
    const result = await SendgridMail.send(options);
    return result;
  }
}
