import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentService } from "../../modules/student/student.service";
import { StudentController } from "../../modules/student/student.controller";
import { StudentSchema } from "../../schemas/Student.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
