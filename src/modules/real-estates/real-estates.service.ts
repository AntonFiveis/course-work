// @ts-ignore
import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { RealEstatesDto, RealEstatesUpdates } from './dto/real-estates.dto';

@Injectable()
export class RealEstatesService {
  constructor(private pgService:PgService) {}
  private tableName = "RealEstates";
  async getRealEstateById(realEstateID:number){
    return this.pgService.findOne({tableName:this.tableName,where:`"realEstateID"=${realEstateID}`})
  }
  async postRealEstate({title,ownerID,priceInDollars,squareInM2,district,address,floorsCount,roomsCount,house}:RealEstatesDto){
    this.pgService.useQuery(`SELECT "PutUpSells"('${title}', ${ownerID}, ${priceInDollars}, ${squareInM2}, '${district}', '${address}', ${floorsCount}, ${roomsCount}, ${house}, true)`)
  }

  async getAllRealEstates() {
    const res = await this.pgService.useQuery(`SELECT * FROM "AdminRealEstatesView"`)
    return res.rows
  }
  async updateRealEstate(updates:RealEstatesUpdates[]){
    const promises = updates.map(({realEstateID, title, priceInDollars, district, address, floorsCount, roomsCount, house, isCurrentlyAvailable}) => 
      this.pgService.update({ tableName: 'RealEstates', updates: { title, priceInDollars, district, address, floorsCount, roomsCount, house, isCurrentlyAvailable }, where: '"realEstateID"=' + realEstateID }))
    Promise.all(promises).catch(error => { throw new Error(error) })
  }
  async deleteRealEstate(realEstateID:number){
    return this.pgService.delete({tableName:this.tableName,where:`"realEstateID"=${realEstateID}`,cascade:true})
  }


}
