import { Injectable } from '@nestjs/common';
import { currentuser,AbilityFactory } from '../ability/ability.factory';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AppService {
  constructor(
    private caslAbilityFactory: AbilityFactory,
    private readonly mailerService: MailerService
){}

  getHello(): any {
    const user = currentuser;
    const ability = this.caslAbilityFactory.defineAbility(user)
    return ability
  }
 
  async getPic(): Promise<any> {
  }

  async sendEmail(): Promise<void> {
    await this.mailerService.sendMail({
      to: 'maaz@yopmail.com',
      subject: 'Welcome to My App',
      template: 'delegate-invitation', // The name of the template file without the extension
      context: {
        // Variables that will be accessible in the email template
        username: 'John Doe',
      },
    });
  }
}