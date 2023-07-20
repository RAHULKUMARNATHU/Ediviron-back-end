import { Controller, Get, Post, Body } from "@nestjs/common";
import { PaymentService } from "../../modules/payment/payment.service";
import { CreatePaymentDto } from "../../modules/payment/dto/create-payment.dto";
import { Payment } from "../../schemas/Payment.schema";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from "@nestjs/swagger";

@Controller("payment")
@ApiTags("Payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: "Create a new payment" })
  @ApiResponse({
    status: 201,
    description: "Payment created successfully",
    type: Payment,
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({
    status: 200,
    description: "Returns all payments",
    type: [Payment],
  })
  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }
}
