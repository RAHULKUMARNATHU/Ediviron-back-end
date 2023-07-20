import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { FeeHeadModule } from "./modules/fee-head/fee-head.module";
import { DueModule } from "./modules/due/due.module";
import { InstallmentModule } from "./modules/installment/installment.module";
import { InvoiceModule } from "./modules/invoice/invoice.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".dev.env"],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),

    FeeHeadModule,
    DueModule,
    InstallmentModule,
    InvoiceModule,
    PaymentModule,
    TransactionModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
