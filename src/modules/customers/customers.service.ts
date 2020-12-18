import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private pgService: PgService) {}
  private  tableName = "Customers"
  async getAllCustomers(){
    const res = await this.pgService.useQuery('SELECT * FROM "GetCustomers"()')
    return res.rows
  }
  async getCustomer(customerID:number){
    const res =await this.pgService.useQuery(`SELECT * FROM "GetCustomer"(${customerID})`)
    return res.rows[0]
  }
  async updateCustomerBudget(customerID:number,budget: number){
     await this.pgService.update({tableName:this.tableName,updates:{budget}, where:`"customerID"=${customerID}`})
  }
  async registerAsCustomer(customerDto:CustomerDto){
    await this.pgService.create({tableName:this.tableName,values:[customerDto]})
  }
  async unregisterAsCustomer(customerID:number){
    await this.pgService.delete({tableName:this.tableName, where:`"customerID=${customerID}`, cascade:true})
  }
}
