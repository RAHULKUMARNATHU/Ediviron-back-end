import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { StudentSchema } from "src/schemas/Student.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
