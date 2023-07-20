import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ timestamps: true })
export class Installment extends Document {
  @ApiProperty({
    required: true,
    type: [Types.ObjectId],
    isArray: true,
    description: "Array of due IDs",
  })
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: "Due" }] })
  dues: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export type InstallmentDocument = Installment & Document;
export const InstallmentSchema = SchemaFactory.createForClass(Installment);
