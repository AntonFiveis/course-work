import { Module } from '@nestjs/common';
import { PgModule } from './modules/pg/pg.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { UsersModule } from './modules/users/users.module';
import { RealEstatesModule } from './modules/real-estates/real-estates.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { RealtorsModule } from './modules/realtors/realtors.module';
import { CustomersModule } from './modules/customers/customers.module';
import { InspectionTimeModule } from './modules/inspection-time/inspection-time.module';


@Module({
  imports: [PgModule, ContractsModule, UsersModule, RealEstatesModule, SellersModule, RealtorsModule, CustomersModule, InspectionTimeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
