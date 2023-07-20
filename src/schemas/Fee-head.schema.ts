import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ timestamps: true })
export class FeeHead extends Document {
  @ApiProperty({ required: true, type: String })
  @Prop({ required: true, type: String })
  name: string;

  @ApiProperty({ required: true, type: Number })
  @Prop({ required: true, type: Number })
  amount: number;

  @ApiProperty({ required: true, type: Number })
  @Prop({ required: true, type: Number })
  frequency: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export type FeeHeadDocument = FeeHead & Document;
export const FeeHeadSchema = SchemaFactory.createForClass(FeeHead);
