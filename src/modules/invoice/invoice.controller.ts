import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Invoice } from "src/schemas/Invoice-schema";

@Controller("invoice")
@ApiTags("Invoices")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOperation({ summary: "Create a new invoice" })
  @ApiResponse({
    status: 201,
    description: "Invoice created successfully",
    type: Invoice,
  })
  @Post("/create")
  create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(createInvoiceDto);
  }

  @ApiOperation({ summary: "Get all invoices" })
  @ApiResponse({
    status: 200,
    description: "Returns all invoices",
    type: [Invoice],
  })
  @Get("/list")
  findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Get("/total/dues")
  findDuesWithPendingStatus() {
    return this.invoiceService.findDuesWithPendingStatus();
  }

  @ApiOperation({ summary: "Get total amount of paid dues" })
  @ApiResponse({
    status: 200,
    description: "Returns the total amount of paid dues",
    type: Number,
  })
  @Get("/total/paid")
  findTotalAmountOfPaid(): Promise<number> {
    return this.invoiceService.findTotalAmountOfPaid();
  }

  @ApiOperation({ summary: "Get total amount of dues in the current month" })
  @ApiResponse({
    status: 200,
    description: "Returns the total amount of dues in the current month",
    type: Number,
  })
  @Get("/total/paid/month")
  findTotalAmountOfPaidInCurrentMonth(): Promise<number> {
    return this.invoiceService.findTotalAmountOfPaidInCurrentMonth();
  }

  @ApiOperation({ summary: "Get month-wise collection data for a year" })
  @ApiResponse({
    status: 200,
    description: "Returns month-wise collection data for the specified year",
    // type: [{ month: String, amount: Number }],
  })
  @Get("/collection/:year")
  findMonthlyCollectionData(
    @Param("year") year: number
  ): Promise<{ month: string; amount: number }[]> {
    return this.invoiceService.findMonthlyCollectionData(year);
  }
}
