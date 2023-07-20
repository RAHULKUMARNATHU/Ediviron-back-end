import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { Invoice, InvoiceDocument } from "src/schemas/Invoice-schema";
import { Due } from "src/schemas/Due.schema";

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const { dues, total_amount, status, student } = createInvoiceDto;

    const createdInvoice = new this.invoiceModel({
      dues,
      total_amount,
      status,
      student,
    });

    return createdInvoice.save();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().populate("dues").exec();
  }

  async findDuesWithPendingStatus(): Promise<number> {
    try {
      const invoices = await this.invoiceModel
        .find({ status: "pending" })
        .populate({
          path: "dues",
          populate: { path: "feeHead" },
        })
        .exec();

      let totalDues = 0;

      invoices.forEach((invoice) => {
        invoice.dues.forEach((due) => {
          totalDues += due.feeHead.amount;
        });
      });

      return totalDues;
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error(
        "An error occurred while retrieving the dues with pending status."
      );
    }
  }

  async  findTotalAmountOfPaid(): Promise<number> {
  try {
    const invoices = await this.invoiceModel
      .find({ status: "paid" })
      .exec();

    let totalAmount = 0;

    invoices.forEach((invoice) => {
      totalAmount += invoice.total_amount;
    });

    return totalAmount;
  } catch (error) {
    // Handle any errors that occur during the database operation
    throw new Error(
      "An error occurred while retrieving the dues with paid status."
    );
  }
}

  async  findTotalAmountOfPaidInCurrentMonth(): Promise<number> {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const invoices = await this.invoiceModel
      .find({
        status: "paid",
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      })
      .exec();

    let totalAmount = 0;

    invoices.forEach((invoice) => {
      totalAmount += invoice.total_amount;
    });

    return totalAmount;
  } catch (error) {
    // Handle any errors that occur during the database operation
    throw new Error(
      "An error occurred while retrieving the total amount of dues in the current month."
    );
  }
}

  // InvoiceService

  async findMonthlyCollectionData(
    year: number
  ): Promise<{ month: string; amount: number }[]> {
    try {
      const collectionData = await this.invoiceModel.aggregate([
        {
          $match: {
            status: "paid",
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%m",
                date: "$createdAt",
              },
            },
            amount: { $sum: "$total_amount" },
          },
        },
        {
          $project: {
            month: "$_id",
            amount: 1,
            _id: 0,
          },
        },
      ]);

      return collectionData;
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error(
        "An error occurred while retrieving the monthly collection data."
      );
    }
  }
}
