import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RealEstatesService } from './real-estates.service';
import { RealEstatesDto, RealEstatesUpdates } from './dto/real-estates.dto';

@Controller('real-estates')
export class RealEstatesController {
  constructor(private realEstatesService:RealEstatesService) {}

  // @Get('/:id')
  // async getRealEstateById(@Query('id') realEstateID: number){
  //   return this.realEstatesService.getRealEstateById(realEstateID)
  // }

  @Get('/title')
  async getRealEstatesByTitle(@Query('search') title: string) {
    return await this.realEstatesService.getRealEstatesByTitle(title)
  }

  @Get('/district')
  async getRealEstatesByDistrict(@Query('search') district: string) {
    return await this.realEstatesService.getRealEstatesByDistrict(district)
  }

  @Get('/price')
  async getRealEstatesByPrice(@Query('start') start: number, @Query('end') end: number) {
    return await this.realEstatesService.getRealEstatesByPrice(start, end)
  }

  @Get()
  async getAllRealEstates(){
    return await this.realEstatesService.getAllRealEstates()
  }
  @Post()
  async putsSellsUp(@Body() realEstatesDto: RealEstatesDto){
    return this.realEstatesService.postRealEstate(realEstatesDto)
  }

  @Patch()
  async updateRealEstate(@Body() allUpdates: RealEstatesUpdates[]){
    return this.realEstatesService.updateRealEstate(allUpdates)
  }

  @Delete('/:id')
  async deleteRealEstate(@Param('id') realEstateID:number){
    return this.realEstatesService.deleteRealEstate(realEstateID)
  }
}
