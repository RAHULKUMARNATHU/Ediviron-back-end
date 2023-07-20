import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";
import { Types } from "mongoose";

export class CreateInstallmentDto {
  @ApiProperty({
    type: [Types.ObjectId],
    isArray: true,
    description: "Array of due IDs",
    example: [new Types.ObjectId()],
  })
  @IsNotEmpty()
  @IsArray()
  dues: Types.ObjectId[];
}
