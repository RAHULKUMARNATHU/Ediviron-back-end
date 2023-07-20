import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { FeeHead } from "../schemas/Fee-head.schema";

@Schema({ timestamps: true })
export class Due extends Document {
    @ApiProperty({
    type: Types.ObjectId,
    required: true,
    description: 'ID of the FeeHead',
  })
  @Prop({ type: Types.ObjectId, ref: 'FeeHead', required: true })
  feeHead: FeeHead;

  @ApiProperty({
    required: true,
    type: Date,
    description: "Start date of the due",
  })
  @Prop({ required: true, type: Date })
  start_date: Date;

  @ApiProperty({
    required: true,
    type: Date,
    description: "Due date of the due",
  })
  @Prop({ required: true, type: Date })
  due_date: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type DueDocument = Due & Document;
export const DueSchema = SchemaFactory.createForClass(Due);
