import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RieltorsService } from './rieltors.service';
import { RieltorsDto } from './dto/rieltors.dto';

@Controller('rieltors')
export class RieltorsController {
  constructor(private rieltorsService:RieltorsService){}
  @Get()
  async getAllRieltors(){
    return this.rieltorsService.getAllRieltors()
  }
  @Post()
  async registerAsRieltor(@Body()rieltorsDto:RieltorsDto){
    return this.rieltorsService.registerAsRieltor(rieltorsDto)
  }
  @Get('/:id')
  async getRieltor(@Param('id') id){
    return this.rieltorsService.getRieltorByID(id);
  }
  @Delete('/:id')
  async unregisterAsRieltor(@Param('id') id){
    return  this.rieltorsService.unregisterAsRieltor(id)
  }
  @Patch()
  async addRatingToRieltor(@Query('id') rieltorID:number, @Query('rating') rating:number){
    rating = rating>5? 5:rating;
    rating = rating<0? 0: rating;
    return this.rieltorsService.addRating(rieltorID,rating)
  }
}
