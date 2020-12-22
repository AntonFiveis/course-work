import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RealtorsService } from './realtors.service';
import { RealtorsDto } from './dto/realtors.dto';

@Controller('realtors')
export class RealtorsController {
  constructor(private realtorsService:RealtorsService){}
  @Get()
  async getAllRealtors(){
    return this.realtorsService.getAllRealtors()
  }
  @Post()
  async registerAsRealtor(@Body()realtorsDto:RealtorsDto){
    return this.realtorsService.registerAsRealtor(realtorsDto)
  }
  @Get('/:id')
  async getRealtor(@Param('id') id){
    return this.realtorsService.getRealtorByID(id);
  }
  @Delete('/:id')
  async unregisterAsRealtor(@Param('id') id){
    return  this.realtorsService.unregisterAsRealtor(id)
  }
  @Patch()
  async addRatingToRealtor(@Query('id') realtorID:number, @Query('rating') rating:number){
    rating = rating>5? 5:rating;
    rating = rating<0? 0: rating;
    return this.realtorsService.addRating(realtorID,rating)
  }
}
