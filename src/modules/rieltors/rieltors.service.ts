import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { RieltorsDto } from './dto/rieltors.dto';

@Injectable()
export class RieltorsService {
  constructor(private pgService:PgService) {}
  private tableName = 'Rieltors'
  async getAllRieltors(){
    const res =await this.pgService.useQuery(`SELECT * FROM "GetRieltors"()`)
    return res.rows
  }
  async getRieltorByID(rieltorID){
    const res =await this.pgService.useQuery(`SELECT * FROM "GetRieltor"(${rieltorID})`)
    return res.rows[0]
  }
  async registerAsRieltor({userID,priceList}:RieltorsDto){
    await this.pgService.useQuery(`SELECT "RegisterAsRieltor"(${userID},${priceList})`)
  }
  async unregisterAsRieltor(userID){
    await this.pgService.delete({tableName:this.tableName, where:`"userID"=${userID}`,cascade:true})
  }
  async addRating(rieltorID:number,rating:number){
    await this.pgService.useQuery(`CALL "UpdateRieltorRating"(${rieltorID},${rating})`)
  }
}
