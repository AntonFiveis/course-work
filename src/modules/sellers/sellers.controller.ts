import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { SellersService } from './sellers.service';

@Controller('sellers')
export class SellersController {
  constructor(private sellersService: SellersService) {
  }

  @Get()
  async getAllSellers() {
    return this.sellersService.getAllSellers();
  }

  @Get('/:id')
  async getSellerByID(@Param('id') sellerID) {
    return this.sellersService.getSeller(sellerID);
  }
  @Patch()
  async addRatingToSeller(@Query('id') sellerID:number, @Query('rating') rating:number){
    rating = rating>5? 5:rating;
    rating = rating<0? 0: rating;
    return this.sellersService.addRating(sellerID,rating)
  }
}
