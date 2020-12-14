import * as SendgridMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

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
