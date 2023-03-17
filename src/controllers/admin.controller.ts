import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from '../ability/ability.decorator';
import { AbilityFactory, Action, currentuser, Subject, User } from '../ability/ability.factory';
import { AppService } from '../services/app.service';
import { ApiDescription } from '../custom/discription';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly appService: AppService,
    private abilityFactory: AbilityFactory
    ) {}

  @Get('permission')
  // @CheckAbilities({ action: Action.Read, subject: Subject.Case})
  getUserPermission(@Query('id') id: number): any {
    let user = [currentuser]
    let res = user.find(( item ) => item.id == id)
    return res;
  }

  @Post(':id')
  // @CheckAbilities({ action: Action.Delete, subject: Subject.Case})
  post(@Param('id') id: number){
    let user = [currentuser]
    let res = user.find(( item ) => item.id == id)

    let reqPermission = 'delete:case'
    let possession = 'own'
    let permissionIndex = res.permission.findIndex(permission => permission.includes(reqPermission));

    if(permissionIndex !== -1) {
      res.permission.splice(permissionIndex, 1,reqPermission+':'+possession );
    }
    // res.permission
    return res;
  }

  @Delete(':id')
  // @CheckAbilities({ action: Action.Delete, subject: Subject.Case})
  remove(@Param('id') id: string){
    return this.appService.getHello();
  }
}