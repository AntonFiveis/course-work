import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { UsersDto, UsersUpdates } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private pgService:PgService) {}
  async getUserById(userID:number){
    return this.pgService.useQuery('')
  }
  async createUser({email,firstName,lastName,patronymic,phone,password,salt}:UsersDto){
    this.pgService.useQuery('')
  }
  async updateUser(userID:number,updates:UsersUpdates){
    this.pgService.useQuery('')
  }
  async deleteUser(userID:number){
    this.pgService.useQuery('')
  }
}
