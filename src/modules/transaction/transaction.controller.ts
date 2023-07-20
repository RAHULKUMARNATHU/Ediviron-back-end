import { Controller, Get, Post, Body } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Transaction } from "src/schemas/Transaction-details.schema";

@Controller("transaction")
@ApiTags("Transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: "Create a new transaction" })
  @ApiResponse({
    status: 201,
    description: "Transaction created successfully",
    type: Transaction,
  })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @ApiOperation({ summary: "Get all transactions" })
  @ApiResponse({
    status: 200,
    description: "Returns all transactions",
    type: [Transaction],
  })
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }
}
