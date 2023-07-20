import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Student , StudentDocument } from "src/schemas/Student.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAndCount(): Promise<{
    distinctClassCount: number;
    sectionCount: number;
    studentCount: number;
  }> {
    const result = await this.studentModel.aggregate([
      {
        $group: {
          _id: "$class",
          sections: { $addToSet: "$section" },
          studentCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          distinctClassCount: { $sum: 1 },
          sectionCount: { $sum: { $size: "$sections" } },
          studentCount: { $sum: "$studentCount" },
        },
      },
      {
        $project: {
          _id: 0,
          distinctClassCount: 1,
          sectionCount: 1,
          studentCount: 1,
        },
      },
    ]);

    return result.length > 0
      ? result[0]
      : { distinctClassCount: 0, sectionCount: 0, studentCount: 0 };
  }

  async findAll(): Promise<Student[]> {
    try {
      return this.studentModel.find().populate('feeHeads').exec();
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error("An error occurred while retrieving the students.");
    }
  }
}