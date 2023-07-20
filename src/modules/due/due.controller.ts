import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DueService } from "./due.service";
import { CreateDueDto } from "./dto/create-due.dto";
import { Due } from "src/schemas/Due.schema";

@Controller("due")
@ApiTags("Due")
export class DueController {
  constructor(private readonly dueService: DueService) {}

  @Post("/create")
  @ApiOperation({ summary: "Create a new due" })
  @ApiResponse({
    status: 201,
    description: "The due has been successfully created",
    type: Due,
  })
  create(@Body() createDueDto: CreateDueDto): Promise<Due> {
    return this.dueService.create(createDueDto);
  }

  @Get("/list")
  @ApiOperation({ summary: "Get all due" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of all due",
    type: [Due],
  })
  findAll(): Promise<Due[]> {
    return this.dueService.findAll();
  }

  @ApiOperation({ summary: "Get the count of students with crossed due dates" })
  @ApiResponse({
    status: 200,
    description: "Returns the count of students with crossed due dates",
    type: Number,
  })
  @Get("/crossed/due-date")
  findStudentsWithCrossedDueDate(): Promise<number> {
    return this.dueService.findStudentsWithCrossedDueDate();
  }
}
