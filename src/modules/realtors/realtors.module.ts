import { Module } from '@nestjs/common';
import { RealtorsService } from './realtors.service';
import { RealtorsController } from './realtors.controller';

@Module({
  providers: [RealtorsService],
  controllers: [RealtorsController]
})
export class RealtorsModule {}
