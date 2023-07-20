import { Injectable } from "@nestjs/common";
import { CreateInstallmentDto } from "../../modules/installment/dto/create-installment.dto";
import { InjectModel } from "@nestjs/mongoose";
import {
  Installment,
  InstallmentDocument,
} from "../../schemas/Installment.schema";
import { Model } from "mongoose";
import { Cron } from "@nestjs/schedule";
import { Due, DueDocument } from "../../schemas/Due.schema";

@Injectable()
export class InstallmentService {
  constructor(
    @InjectModel(Installment.name)
    private readonly installmentModel: Model<InstallmentDocument>,
    @InjectModel(Due.name)
    private readonly dueModel: Model<DueDocument>
  ) {}

  async create(
    createInstallmentDto: CreateInstallmentDto
  ): Promise<Installment> {
    const { dues } = createInstallmentDto;
    const installment = new this.installmentModel({ dues });
    return installment.save();
  }

  async findAll(): Promise<Installment[]> {
    return this.installmentModel.find().populate("dues").exec();
  }

  @Cron("0 0 4 * * *") // Runs at 12:00 AM on the 4th day of every month
  async processInstallments() {
    try {
      const currentDate = new Date();
     // Get the 4th day of the current month
      const fourthDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        4
      );
      const dues = await this.dueModel
        .find({ end_date: { $lt: fourthDayOfMonth } })
        .exec();
      
        const installments = dues.map((due) => ({
         dueId: due._id,
      }));
      await this.installmentModel.insertMany(installments);
    } catch (error) {
      console.error(
        "An error occurred during the installment processing:",
        error
      );
    }
  }
}


