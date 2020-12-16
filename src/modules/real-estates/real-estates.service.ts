import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { RealEstatesDto, RealEstatesUpdates } from './dto/real-estates.dto';

@Injectable()
export class RealEstatesService {
  constructor(private pgService:PgService) {}
  async getRealEstateById(realEstateID:number){
    return this.pgService.useQuery('')
  }
  async postRealEstate({title,ownerID,priceInDollars,squareInM2,district,address,floorsCount,roomsCount,house}:RealEstatesDto){
    this.pgService.useQuery(`SELECT "PutUpSells"('${title}', ${ownerID}, ${priceInDollars}, ${squareInM2}, '${district}', '${address}', ${floorsCount}, ${roomsCount}, ${house}, true)`)
  }

  async getAllRealEstates() {
    const res = await this.pgService.useQuery(`SELECT * FROM "AdminRealEstatesView"`)
    return res.rows
  }
  async updateRealEstate(realEstateID:number,updates:RealEstatesUpdates){
    return this.pgService.useQuery('')
  }
  async deleteRealEstate(realEstateID:number){
    return this.pgService.useQuery('')
  }


}
