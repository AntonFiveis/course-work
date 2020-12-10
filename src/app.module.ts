import { Module } from '@nestjs/common';
import { PgModule } from './modules/pg/pg.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { UsersModule } from './modules/users/users.module';
import { RealEstatesModule } from './modules/real-estates/real-estates.module';


@Module({
  imports: [PgModule, ContractsModule, UsersModule, RealEstatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
