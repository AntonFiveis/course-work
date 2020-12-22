
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
    const promises = updates.map(realEstate => 
      this.pgService.update({ tableName: 'RealEstates', updates: { ...realEstate, realEstateID: undefined }, where: '"realEstateID"=' + realEstate.realEstateID }))
    Promise.all(promises).catch(error => { throw new Error(error) })
  }
  async deleteRealEstate(realEstateID:number){

    await this.pgService.delete({tableName:this.tableName,where:`"realEstateID"=${realEstateID}`,cascade:true})

  }

  async getRealEstatesByTitle(title: string){
    const res = await this.pgService.useQuery(`SELECT * FROM "AdminRealEstatesView" WHERE "title" ILIKE '%${title}%'`)
    return res.rows
  }

  async getRealEstatesByDistrict(district: string) {
    const res = await this.pgService.useQuery(`SELECT * FROM "AdminRealEstatesView" WHERE "district" ILIKE '${district}%'`)
    return res.rows
  }

  async getRealEstatesByPrice(start: number, end: number) {
    const res = await this.pgService.useQuery(`SELECT * FROM "AdminRealEstatesView" WHERE "priceInDollars" BETWEEN ${start} AND ${end}`)
    return res.rows
  }

}
