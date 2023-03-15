import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from './ability/ability.decorator';
import { AbilityFactory, Action, currentuser, Subject, User } from './ability/ability.factory';
import { AppService } from './app.service';

@ApiTags('Case')
@Controller('case')
export class CaseController {
  constructor(private readonly appService: AppService,
    private abilityFactory: AbilityFactory
    ) {}

  @Get('resource')
  @CheckAbilities({ action: Action.Read, subject: Subject.Case})
  getHello(): string {
    const user = currentuser;
    return this.appService.getHello();
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: Subject.Case})
  remove(@Param('id') id: string){
    return 'deleted'
  }
}