import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractDto, ContractUpdates } from './dto/contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}
  @Get('/:id')
  async getContractById(@Query('id') id:number){
    return this.contractsService.getContractById(id)
  }
  @Get()
  async getAllContracts(){
    return this.contractsService.getAllContracts()
  }
  @Post()
  async createContract(@Body() contractDto:ContractDto){
    return this.contractsService.createContract(contractDto)
  }
  @Post('/:id')
  async closeContract(@Query('id') id:number){
    return this.contractsService.closeContract(id)
  }
  @Patch('/:id')
  async updateContract(@Query('id') id:number, @Body() updates:ContractUpdates){
    return this.contractsService.updateContract(id,updates);
  }
}
