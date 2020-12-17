import { Module } from '@nestjs/common';
import { RieltorsService } from './rieltors.service';
import { RieltorsController } from './rieltors.controller';

@Module({
  providers: [RieltorsService],
  controllers: [RieltorsController]
})
export class RieltorsModule {}
