import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class CreateTransactionDto {
  @ApiProperty({
    required: true,
    type: [Types.ObjectId],
    isArray: true,
    description: "Array of invoice IDs",
    example: [
      new Types.ObjectId("611d4f8e33e081a23c8ad5e4"),
      new Types.ObjectId("611d4f8e33e081a23c8ad5e5"),
    ],
  })
  invoiceId: Types.ObjectId[];

  @ApiProperty({
    required: true,
    type: Object,
    description: "Payment attempt details",
    example: {
      paymentMethod: "Cash",
      status: "Paid",
    },
  })
  paymentAttempt: {
    paymentMethod: string;
    status: string;
  };
}
