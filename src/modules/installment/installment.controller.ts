import { Controller, Get, Post, Body } from "@nestjs/common";
import { InstallmentService } from "../../modules/installment/installment.service";
import { CreateInstallmentDto } from "../../modules/installment/dto/create-installment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Installment } from "../../schemas/Installment.schema";

@Controller("installment")
@ApiTags("Installments")
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @ApiOperation({ summary: "Create a new installment" })
  @ApiResponse({
    status: 201,
    description: "Installment created successfully",
    type: Installment,
  })
  @Post("/create")
  create(
    @Body() createInstallmentDto: CreateInstallmentDto
  ): Promise<Installment> {
    return this.installmentService.create(createInstallmentDto);
  }

  @ApiOperation({ summary: "Get all installments" })
  @ApiResponse({
    status: 200,
    description: "Returns all installments",
    type: [Installment],
  })
  @Get("/list")
  findAll(): Promise<Installment[]> {
    return this.installmentService.findAll();
  }
}
