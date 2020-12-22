import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { UsersDto, UsersUpdates } from './dto/users.dto';
import { UsersEntity } from './users.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
  constructor(private pgService: PgService) { }
  private tableName = "Users"
  async getUserByEmail(email: string) {
    const res = await this.pgService.useQuery(`SELECT * FROM "Users" WHERE "email"='${email}'`)
    return res.rows[0]
  }
  async createUser({ email, firstName, lastName, patronymic, phone, password }: UsersDto) {
    const salt = await bcrypt.genSalt()
    const genPassword = await bcrypt.hash(password, salt)
    return this.pgService.useQuery(`SELECT "CreateUser" ('${email}','${firstName}','${lastName}','${patronymic}','${phone}','${genPassword}','${salt}')`)
  }
  async updateUser(userID: number, updates: UsersUpdates) {
    return this.pgService.update({ tableName: this.tableName, updates, where: `"userID"=${userID}` })
  }
  async deleteUser(userID: number) {
    await this.pgService.delete({ tableName: this.tableName, where: `"userID"=${userID}` })
  }
  async signIn(email: string, password: string) {
    const user: UsersEntity = await this.getUserByEmail(email)
    if (this.validatePassword(password, user)) {
      return user
    } else {
      throw new UnauthorizedException("Incorrect credentials")
    }
  }
  async validatePassword(login_password: string, { password, salt }: UsersEntity) {
    return await bcrypt.hash(login_password, salt) === password;
  }
}
