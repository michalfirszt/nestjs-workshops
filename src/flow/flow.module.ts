import { Module } from '@nestjs/common';

import { FlowService } from './flow.service';
import { FlowResolver } from './flow.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flow } from './flow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flow])],
  providers: [FlowService, FlowResolver],
  exports: [FlowService],
})
export class FlowModule {}
