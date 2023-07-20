import { Controller, Get, Post, Body } from "@nestjs/common";
import { StudentService } from "../../modules/student/student.service";
import { CreateStudentDto } from "../../modules/student/dto/create-student.dto";
import { Student } from "../../schemas/Student.schema";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Student")
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: "Create a new student" })
  @ApiResponse({
    status: 201,
    description: "Student created successfully",
    type: Student,
  })
  @Post("/create")
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: "Get all students" })
  @ApiResponse({
    status: 200,
    description: "Retrieve all students successfully",
    type: [Student],
  })
  @Get("/list")
  async findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({
    summary: "Get the count of distinct classes, sections, and students",
  })
  @ApiResponse({
    status: 200,
    description:
      "Returns the count of distinct classes, sections, and students",
  })
  @Get("/count")
  async findAndCount(): Promise<{
    distinctClassCount: number;
    sectionCount: number;
    studentCount: number;
  }> {
    return this.studentService.findAndCount();
  }
}
