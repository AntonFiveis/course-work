import { Module } from '@nestjs/common';
import { RealEstatesService } from './real-estates.service';
import { RealEstatesController } from './real-estates.controller';

@Module({
  providers: [RealEstatesService],
  controllers: [RealEstatesController]
})
export class RealEstatesModule {}
