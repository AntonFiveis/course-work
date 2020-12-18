import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService:CustomersService){}
  @Get()
  async getAllCustomers(){
    return this.customersService.getAllCustomers()
  }
  @Get('/:id')
  async getCustomer(@Param('id') customerID){
    return this.customersService.getCustomer(customerID)
  }
  @Patch()
  async updateCustomer(@Query('customerID') customerID:number, @Query('budget') budget:number ){
    return this.customersService.updateCustomerBudget(customerID,budget)
  }
  @Post()
  async registerAsCustomer(@Query() customerDto:CustomerDto){
    return this.customersService.registerAsCustomer(customerDto)
  }
  @Delete('/:id')
  async unregisterAsCustomer(@Param('id')customerID:number){
    return this.customersService.unregisterAsCustomer(customerID)
  }

}
