import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Transaction,
  TransactionDocument,
} from "src/schemas/Transaction-details.schema";

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    createdTransaction.paymentAttempt.transactionId = createdTransaction._id;
    return createdTransaction.save();
  }

  async findAll() {
  const transactions = await this.transactionModel.find().exec();

  const paymentMethods: { [key: string]: number } = transactions.reduce(
    (accumulator, transaction) => {
      const paymentMethod = transaction.paymentAttempt.paymentMethod;

      if (!accumulator[paymentMethod]) {
        accumulator[paymentMethod] = 0;
      }

      accumulator[paymentMethod] += 1;

      return accumulator;
    },
    {}
  );

  const totalTransactions = transactions.length;

  // Calculate percentages for each payment method
  const paymentMethodPercentages = Object.entries(paymentMethods).map(
    ([paymentMethod, count]) => ({
      paymentMethod,
      percentage: (count / totalTransactions) * 100,
    })
  );

  // Initialize data for the pie chart
  const pieChartData = {
    labels: paymentMethodPercentages.map((data) => data.paymentMethod),
    data: paymentMethodPercentages.map((data) => data.percentage),
  };

  return pieChartData;
}



}
