import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';

@Injectable()
export class InspectionTimeService {
  constructor(private pgService:PgService) {}
  private tableName ="InspectionTime"
  async getTimeTableBetween(realEstateID:number, beginDate:string,endDate:string){
    const res =await this.pgService.useQuery(`SELECT * FROM "GetInspectionTimesBetween"(${realEstateID}, ${beginDate},${endDate})`)
    return res.rows
  }
  async appointTime(realEstateID:number, rieltorID:number,date: string){
    await this.pgService.useQuery(`SELECT "AppointTime"(${realEstateID},${rieltorID},${date})`)
  }
  async deleteInspectionTime(inspectionTimeID){
    await this.pgService.delete({tableName:this.tableName, where:`"id"=${inspectionTimeID}`})
  }
}
