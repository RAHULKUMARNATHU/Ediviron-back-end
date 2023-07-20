import {
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsDate,
  IsDateString,
} from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

enum PaymentMethod {
  CASH = "Cash",
  ONLINE = "Online",
  CHEQUE = "Cheque",
}

export class CreatePaymentDto {
  @ApiProperty({
    required: true,
    type: Types.ObjectId,
    description: "ID of the installment",
    example: new Types.ObjectId().toHexString(),
  })
  @IsNotEmpty()
  Installment: Types.ObjectId;

  @ApiProperty({
    required: true,
    type: Number,
    description: "Amount paid",
  })
  @IsNotEmpty()
  @IsNumber()
  amountPaid: number;

  @ApiProperty({
    required: true,
    type: String,
    format: "date",
    description: "Date of payment",
    example: "2023-07-19",
  })
  @IsNotEmpty()
  @IsDateString()
  paymentDate: string;

  @ApiProperty({
    required: true,
    enum: PaymentMethod,
    description: "Payment method",
    enumName: "PaymentMethod",
  })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
