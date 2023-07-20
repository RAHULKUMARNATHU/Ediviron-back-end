import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Due } from "./Due.schema";

enum FeeHeadStatus {
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
}

@Schema({ timestamps: true })
export class Invoice extends Document {
  @ApiProperty({
    required: true,
    type: [Types.ObjectId],
    isArray: true,
    description: "Array of due IDs",
  })
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: "Due" }] })
  dues: Due[];

  @ApiProperty({
    required: true,
    type: Number,
    description: "total amounts",
  })
  @Prop({ required: true })
  total_amount: number;

  @ApiProperty({
    required: true,
    enum: FeeHeadStatus,
    default: FeeHeadStatus.PENDING,
  })
  @Prop({ required: true, enum: FeeHeadStatus, default: FeeHeadStatus.PENDING })
  status: FeeHeadStatus;

  @ApiProperty({
    required: true,
    type: Types.ObjectId,
    description: "ID of the student",
    example: "614c259d6c0bdf001f6f8e35",
  })
  @Prop({ required: true, type: Types.ObjectId, ref: "Student" })
  student: Types.ObjectId;
  
  createdAt: Date;
  updatedAt: Date;
}

export type InvoiceDocument = Invoice & Document;
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
