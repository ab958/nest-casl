import { BadGatewayException, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ContractController } from './controllers/contract.controller';
import { AccessControlModule } from 'nest-access-control';
import { AppService } from './services/app.service';
import { roles } from './constants/role'
import { AbilityFactory, currentuser } from './ability/ability.factory';
import { CaseController } from './controllers/case.controller';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './ability/abilities.guard';
import { SwaggerService } from './services/swagger.service';
import { AdminController } from './controllers/admin.controller';

@Module({
  imports: [],
  controllers: [ContractController,CaseController,AdminController],
  providers: [AppService,AbilityFactory, {
    provide: APP_GUARD,
    useClass: AbilitiesGuard
  }],
})

export class AppModule  implements  OnApplicationBootstrap {
  
  // configure(consumer: MiddlewareConsumer) {
  //   if (
  //     this.config.get('NODE_ENV') != 'production' &&
  //     this.config.get('CLOUDWATCH_LOGS') == 'true'
  //   ) {
  //     consumer.apply(LoggerMiddleware).forRoutes('*');
  //   }
  //   consumer.apply(RouterMiddleware).exclude('health-check(.*)').forRoutes('*');
  // }

  async onApplicationBootstrap() {
      try {
        const document = SwaggerService._document;
        let defaultpermission = []

        for (let key in document.paths) {

          let prop: any = document.paths[key]
          let [method] = Object.keys(prop)
          let operationId = Object.values(prop as [{ operationId: string }])[0].operationId.split('.')[0].toLowerCase()
          if( method === 'patch') method = 'update'
          if( method === 'put') method = 'update'

          let permission = method + ':' +operationId + ':' + 'all'

          if(operationId !== 'admin'){
            defaultpermission.push(permission)
          }
        }
        currentuser.permission = defaultpermission
      } catch (err) {
        throw new BadGatewayException();
      }
  }
}

