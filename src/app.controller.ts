import { Body, Controller, ForbiddenException, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AbilityFactory, Action, User } from './ability/ability.factory';
import { AppService } from './app.service';
import { ApiDescription } from './custom/discription';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private abilityFactory: AbilityFactory
    ) {}

  @Get('resource')
  getHello(): string {
    const user = { id: 1, isAdmin: false}
    const ability = this.abilityFactory.defineAbility(user)

    const isAllowed = ability.can(Action.Create, User) 
    console.log(isAllowed)
    if(!isAllowed){
      throw new ForbiddenException('only admin')
    }
    return this.appService.getHello();
  }

  @UseInterceptors(LoggingInterceptor)
  @Post('/pic')
  @ApiDescription('the fuction is testing somethings')
  postPic(@Body() dto: { name: string }  
  ){
    return this.appService.getPic();
  }

  @Post('something')
  @ApiDescription('abc')
  getHello1(): string {
    return this.appService.getHello();
  }
}