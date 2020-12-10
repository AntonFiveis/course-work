import { Module } from '@nestjs/common';
import { PgModule } from './modules/pg/pg.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [PgModule, ContractsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
