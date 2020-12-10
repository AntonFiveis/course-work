import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto, UsersUpdates } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService:UsersService){}
  @Get('/:email')
  async getUserById(@Query('email') email:string){
    return this.usersService.getUserByEmail(email)
  }
  @Post()
  async createUser(@Body() usersDto:UsersDto){
    return this.usersService.createUser(usersDto)
  }
  @Delete('/:id')
  async deleteUser(@Query('id') userID:number){
    return this.usersService.deleteUser(userID)
  }
  @Patch('/:id')
  async updateUser(@Query('id')userID:number, @Body() updates:UsersUpdates){
    return this.usersService.updateUser(userID,updates)
  }
}
