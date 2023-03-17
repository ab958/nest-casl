import { Body, Controller, Delete, ForbiddenException, Get, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbilityFactory, Action, currentuser, Subject, User } from '../ability/ability.factory';
import { AppService } from '../services/app.service';
import { ApiDescription } from '../custom/discription';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

@ApiTags('Contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly appService: AppService,
    private abilityFactory: AbilityFactory
    ) {}

  @Get('resource')
  getHello(): string {
    const user = currentuser;
    const ability = this.abilityFactory.defineAbility(user)

    const isAllowed = ability.can(Action.Read, Subject.Contract) 
    console.log(isAllowed)
    if(!isAllowed){
      throw new ForbiddenException('you donot have permission to access this route')
    }
    return this.appService.getHello();
  }

  // @UseInterceptors(LoggingInterceptor)
  // @Post('/pic')
  // @ApiDescription('the fuction is testing somethings')
  // postPic(@Body() dto: { name: string }  
  // ){
  //   return this.appService.getPic();
  // }

  @Delete('something')
  @ApiDescription('abc')
  getHello1(): string {
    return this.appService.getHello();
  }
}