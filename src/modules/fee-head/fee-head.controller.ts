import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FeeHeadService } from "./fee-head.service";
import { CreateFeeHeadDto } from "./dto/create-fee-head.dto";
import { FeeHead } from "src/schemas/Fee-head.schema";

@Controller("fee-head")
@ApiTags("Fee Head")
export class FeeHeadController {
  constructor(private readonly feeHeadService: FeeHeadService) {}

  @Post("/create")
  @ApiOperation({ summary: "Create a new fee head" })
  @ApiResponse({
    status: 201,
    description: "The fee head has been successfully created",
    type: FeeHead,
  })
  create(@Body() createFeeHeadDto: CreateFeeHeadDto): Promise<FeeHead> {
    return this.feeHeadService.create(createFeeHeadDto);
  }

  @Get("/list")
  @ApiOperation({ summary: "Get all fee heads" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of all fee heads",
    type: [FeeHead],
  })
  findAll(): Promise <FeeHead[]> {
    return this.feeHeadService.findAll();
  }
}
