import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { FeeHead } from "./Fee-head.schema";

@Schema({ timestamps: true })
export class Student extends Document {
  @ApiProperty({ required: true, type: String, example: "John Doe" })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ required: true, type: String, example: "A" })
  @Prop({ required: true })
  class: string;

  @ApiProperty({ required: true, type: String, example: "Section A" })
  @Prop({ required: true })
  section: string;

  @ApiProperty({
    required: true,
    type: String,
    example: "123 Main Street, City, Country",
  })
  @Prop({ required: true })
  address: string;

  @ApiProperty({
    required: true,
    type: [FeeHead],
    description: "Array of fee heads",
    example: [
      {
        _id: "64b55d39b47d81c109f3b3b6",
        name: "Tuition Fee",
        amount: 1000,
        frequency: 1,
      },
      {
        _id: "64b55d39b47d81c109f3b3b7",
        name: "Exam Fee",
        amount: 500,
        frequency: 1,
      },
    ],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: FeeHead.name }] })
  feeHeads: FeeHead[];
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
