import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateDueDto } from "./dto/create-due.dto";
import { Due, DueDocument } from "src/schemas/Due.schema";

@Injectable()
export class DueService {
  constructor(@InjectModel(Due.name) private dueModel: Model<DueDocument>) {}

  async create(createDueDto: CreateDueDto): Promise<Due> {
    try {
      const { feeHead, startDate, dueDate } = createDueDto;

      const createdDue = new this.dueModel({
        feeHead,
        start_date: new Date(startDate),
        due_date: new Date(dueDate),
      });

      const savedDue = await createdDue.save();
      return savedDue;
    } catch (error) {
      console.log(error.name);
      // Handle any errors that occur during the database operation
      if (error.name.toLowerCase() === "validationerror") {
        console.log("ValidationError");
      }
      throw new Error("An error occurred while creating the due.");
    }
  }

  async findAll(): Promise<Due[]> {
    try {
      const dues = await this.dueModel.find().populate("feeHead").exec();
      return dues;
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error("An error occurred while retrieving the dues.");
    }
  }

  async findStudentsWithCrossedDueDate(): Promise<number> {
    try {
      const currentDate = new Date();

      const studentsCount = await this.dueModel
        .find({ due_date: { $lt: currentDate } })
        .distinct("student")
        .countDocuments();

      return studentsCount;
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error(
        "An error occurred while retrieving the count of students with crossed due dates."
      );
    }
  }
}
