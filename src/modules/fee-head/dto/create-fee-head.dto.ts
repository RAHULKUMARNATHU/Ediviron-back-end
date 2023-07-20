import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFeeHeadDto {
  @ApiProperty({
    example: "Tuition Fee",
    description: "The name of the fee head",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1000, description: "The amount of the fee head" })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 1,
    description: "The frequency of the fee head in months",
  })
  @IsNotEmpty()
  @IsNumber()
  frequency: number;
}
