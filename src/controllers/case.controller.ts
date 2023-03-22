import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from '../ability/ability.decorator';
import { AbilityFactory, Action, currentuser, Subject, User } from '../ability/ability.factory';
import { AppService } from '../services/app.service';
import { ApiDescription } from '../custom/discription';

@ApiTags('Case')
@Controller('case')
export class CaseController {
  constructor(private readonly appService: AppService,
    private abilityFactory: AbilityFactory
    ) {}

  @Get('resource')
  // @ApiDescription('get')
  @CheckAbilities({ action: Action.Read, subject: Subject.Case})
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete(':id')
  // @ApiDescription('get')
  @CheckAbilities({ action: Action.Delete, subject: Subject.Case})
  remove(@Param('id') id: string){
    return this.appService.getHello();
  }
}