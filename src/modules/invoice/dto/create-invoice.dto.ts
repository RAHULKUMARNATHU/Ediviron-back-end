import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class CreateInvoiceDto {
  @ApiProperty({
    required: true,
    type: [Types.ObjectId],
    isArray: true,
    description: "Array of due IDs",
    example: ["614c25a86c0bdf001f6f8e37", "614c25b16c0bdf001f6f8e39"],
  })
  dues: Types.ObjectId[];

  @ApiProperty({
    required: true,
    type: Number,
    description: "Total amount",
    example: 1000,
  })
  total_amount: number;

  @ApiProperty({
    required: true,
    enum: ["pending", "paid", "overdue"],
    default: "pending",
    example: "paid",
  })
  status: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "ID of the student",
    example: "614c259d6c0bdf001f6f8e35",
  })
  student: string;
}
