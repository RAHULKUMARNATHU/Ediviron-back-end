import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ timestamps: true })
export class PaymentAttempt extends Document {
  @ApiProperty({ required: true, description: "Payment method" })
  @Prop({ required: true })
  paymentMethod: string;

  @ApiProperty({ required: true, description: "Transaction ID" })
  @Prop({ required: true })
  transactionId: string;

  @ApiProperty({ required: true, description: "Payment status" })
  @Prop({ required: true })
  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export type PaymentAttemptDocument = PaymentAttempt & Document;
export const PaymentAttemptSchema =
  SchemaFactory.createForClass(PaymentAttempt);
