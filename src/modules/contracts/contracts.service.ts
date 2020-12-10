import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ContractDto, ContractUpdates } from './dto/contract.dto';

@Injectable()
export class ContractsService {
  constructor(private pgService:PgService) {}
  async getContractById(id:number){
      return this.pgService.useQuery('')
  }
  async getAllContracts() {
      return this.pgService.useQuery('')
  }
  async createContract({realEstateID,customerID,status,finalPrice}:ContractDto){
    return this.pgService.useQuery('')
  }
  async updateContract(id:number,updates:ContractUpdates){
    return this.pgService.useQuery('')
  }
  async closeContract(id:number){
    return this.pgService.useQuery('')
  }
}
