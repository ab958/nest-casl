import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccessControlModule } from 'nest-access-control';
import { AppService } from './app.service';
import { roles } from './constants/role'
import { AbilityFactory } from './ability/ability.factory';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,AbilityFactory],
})

export class AppModule {}
