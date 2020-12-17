import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';

@Injectable()
export class SellersService {
  constructor(private pgService:PgService) {
  }
  async getAllSellers(){
    const res =await this.pgService.useQuery(`SELECT * FROM "GetSellers"()`)
    return res.rows
  }
  async getSeller(sellerID:number){
    const res =  await this.pgService.useQuery(`SELECT * FROM "GetSeller"(${sellerID})`)
    return res.rows[0]
  }
  async addRating(sellerID:number, rating: number){
    await this.pgService.useQuery(`CALL "UpdateSellerRating"(${sellerID},${rating})`)
  }


}
