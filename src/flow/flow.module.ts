import { Module } from '@nestjs/common';

import { UserController } from '../user/user.controller';
import { FlowService } from './flow.service';
import { FlowResolver } from './flow.resolver';

@Module({
  controllers: [UserController],
  providers: [FlowService, FlowResolver],
  exports: [FlowService],
})
export class FlowModule {}
