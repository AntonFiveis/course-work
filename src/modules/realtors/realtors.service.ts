import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { RealtorsDto } from './dto/realtors.dto';

@Injectable()
export class RealtorsService {
  constructor(private pgService:PgService) {}
  private tableName = 'Realtors'
  async getAllRealtors(){
    const res =await this.pgService.useQuery(`SELECT * FROM "GetRealtors"()`)
    return res.rows
  }
  async getRealtorByID(realtorID){
    const res =await this.pgService.useQuery(`SELECT * FROM "GetRealtor"(${realtorID})`)
    return res.rows[0]
  }
  async registerAsRealtor({userID,priceList}:RealtorsDto){
    // console.log(`SELECT "RegisterAsRealtor"(${userID},${priceList})`)
    await this.pgService.useQuery(`SELECT "RegisterAsRealtor"(${userID},'${priceList}')`)
  }
  async unregisterAsRealtor(userID){
    await this.pgService.delete({tableName:this.tableName, where:`"userID"=${userID}`,cascade:true})
  }
  async addRating(realtorID:number,rating:number){
    await this.pgService.useQuery(`CALL "UpdateRealtorRating"(${realtorID},${rating})`)
  }
}
