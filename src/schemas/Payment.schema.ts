import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

enum PaymentMethod {
  CASH = "Cash",
  ONLINE = "Online",
  CHEQUE = "Cheque",
}

@Schema({ timestamps: true })
export class Payment extends Document {
  @ApiProperty({ required: true, description: "ID of the installment" })
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: "Installment",
  })
  Installment: Types.ObjectId;

  @ApiProperty({ required: true, type: Number, description: "Amount paid" })
  @Prop({ required: true })
  amountPaid: number;

  @ApiProperty({ required: true, type: Date, description: "Date of payment" })
  @Prop({ required: true })
  paymentDate: Date;

  @ApiProperty({
    required: true,
    enum: PaymentMethod,
    description: "Payment method",
  })
  @Prop({ required: true, enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  createdAt: Date;
  updatedAt: Date;
}

export type PaymentDocument = Payment & Document;
export const PaymentSchema = SchemaFactory.createForClass(Payment);
