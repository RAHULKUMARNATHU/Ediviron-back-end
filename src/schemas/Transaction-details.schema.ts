import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentAttempt, PaymentAttemptSchema } from "./Payment-attempt.schema";

@Schema({ timestamps: true })
export class Transaction extends Document {
  @ApiProperty({
    required: true,
    type: [Types.ObjectId],
    isArray: true,
    description: "Array of invoice IDs",
  })
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: "Invoice" }] })
  invoiceId: Types.ObjectId[];

  @ApiProperty({
    required: true,
    type: PaymentAttempt,
    description: "Payment attempt details",
  })
  @Prop({ type: PaymentAttemptSchema, required: true })
  paymentAttempt: PaymentAttempt;

  createdAt: Date;
  updatedAt: Date;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
