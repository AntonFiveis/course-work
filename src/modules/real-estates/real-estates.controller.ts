import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { RealEstatesService } from './real-estates.service';
import { RealEstatesDto, RealEstatesUpdates } from './dto/real-estates.dto';

@Controller('real-estates')
export class RealEstatesController {
  constructor(private realEstatesService:RealEstatesService) {}

  @Get('/:id')
  async getRealEstateById(@Query('id') realEstateID: number){
    return this.realEstatesService.getRealEstateById(realEstateID)
  }
  @Get()
  async getAllRealEstates(){
    return await this.realEstatesService.getAllRealEstates()
  }
  @Post()
  async putsSellsUp(@Body() realEstatesDto: RealEstatesDto){
    return this.realEstatesService.postRealEstate(realEstatesDto)
  }
  @Patch('/:id')
  async updateRealEstate(@Query('id') realEstateID:number, @Body() updates: RealEstatesUpdates){
    return this.realEstatesService.updateRealEstate(realEstateID,updates)
  }

  @Delete('/:id')
  async deleteRealEstate(@Query('id') realEstateID:number){
    return this.realEstatesService.deleteRealEstate(realEstateID)
  }
}
