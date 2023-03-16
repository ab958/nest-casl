import { Injectable } from '@nestjs/common';
import { currentuser,AbilityFactory } from './ability/ability.factory';


@Injectable()
export class AppService {
  constructor(
    private caslAbilityFactory: AbilityFactory
){}

  getHello(): any {
    const user = currentuser;
    const ability = this.caslAbilityFactory.defineAbility(user)
    return ability
  }
 
  async getPic(): Promise<any> {
  }
}