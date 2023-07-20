import { Module } from "@nestjs/common";
import { TransactionService } from "../../modules/transaction/transaction.service";
import { TransactionController } from "../../modules/transaction/transaction.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Transaction,
  TransactionSchema,
} from "../../schemas/Transaction-details.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
