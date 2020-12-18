import { Module } from '@nestjs/common';
import { InspectionTimeService } from './inspection-time.service';
import { InspectionTimeController } from './inspection-time.controller';

@Module({
  providers: [InspectionTimeService],
  controllers: [InspectionTimeController]
})
export class InspectionTimeModule {}
