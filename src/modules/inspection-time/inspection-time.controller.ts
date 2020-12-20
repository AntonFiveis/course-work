import { BadRequestException, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InspectionTimeService } from './inspection-time.service';

@Controller('inspection-time')
export class InspectionTimeController {
  constructor(private inspectionTimeService: InspectionTimeService) {}
  @Get()
  async getTimeTable(
    @Query('realEstateID') realEstateID:number,
    @Query('beginDate') beginDate:string,
    @Query('endDate') endDate:string
  ) {
    if(!beginDate||!endDate)
      throw new BadRequestException('Invalid input!')
    return this.inspectionTimeService.getTimeTableBetween(realEstateID, beginDate, endDate);
  }
  @Delete('/:id')
  async deleteInspectionTime(@Param('id') inspectionTimeID){
    return this.inspectionTimeService.deleteInspectionTime(inspectionTimeID)
  }
  @Post()
  async appointTime(@Query('realEstateID') realEstateID:number, @Query('rieltorID') rieltorID:number, @Query('date') date:string){
    return this.inspectionTimeService.appointTime(realEstateID,rieltorID,date);
  }

}
