import { BadGatewayException, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccessControlModule } from 'nest-access-control';
import { AppService } from './app.service';
import { roles } from './constants/role'
import { AbilityFactory } from './ability/ability.factory';
import { CaseController } from './case.controller';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './ability/abilities.guard';
import { SwaggerService } from './swagger.service';

@Module({
  imports: [],
  controllers: [AppController,CaseController],
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
        console.log(document,'aaaa')
      } catch (err) {
        throw new BadGatewayException();
      }
  }
}

