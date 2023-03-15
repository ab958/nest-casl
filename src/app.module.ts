import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccessControlModule } from 'nest-access-control';
import { AppService } from './app.service';
import { roles } from './constants/role'
import { AbilityFactory } from './ability/ability.factory';
import { CaseController } from './case.controller';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './ability/abilities.guard';

@Module({
  imports: [],
  controllers: [AppController,CaseController],
  providers: [AppService,AbilityFactory, {
    provide: APP_GUARD,
    useClass: AbilitiesGuard
  }],
})

export class AppModule {}
