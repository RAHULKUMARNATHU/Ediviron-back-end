import { IsNotEmpty, IsDate, IsDateString, IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDueDto {
  @ApiProperty({
    description: "ID of the fee head",
    type: Types.ObjectId,
    example: new Types.ObjectId().toHexString(),
  })
  @IsNotEmpty()
  @IsMongoId()
  feeHead: Types.ObjectId;

  @ApiProperty({
    required: true,
    type: String,
    format: "date",
    description: "Start date of the due",
    example: "2023-07-19",
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    required: true,
    type: String,
    format: "date",
    description: "Due date of the due",
    example: "2023-08-19",
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
