import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
  @ApiProperty({
    required: true,
    description: "Student name",
    example: "John Doe",
  })
  name: string;

  @ApiProperty({ required: true, description: "Student class", example: "A" })
  class: string;

  @ApiProperty({
    required: true,
    description: "Student section",
    example: "Section A",
  })
  section: string;

  @ApiProperty({
    required: true,
    description: "Student address",
    example: "123 Main Street, City, Country",
  })
  address: string;

  @ApiProperty({
    required: true,
    type: [String],
    isArray: true,
    description: "Array of fee head IDs",
    example: ["64b55d39b47d81c109f3b3b6", "64b55d39b47d81c109f3b3b7"],
  })
  feeHeads: string[];
}
