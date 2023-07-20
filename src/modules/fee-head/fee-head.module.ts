import { Module } from "@nestjs/common";
import { FeeHeadService } from "./fee-head.service";
import { FeeHeadController } from "./fee-head.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { FeeHead, FeeHeadSchema } from "src/schemas/Fee-head.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FeeHead.name, schema: FeeHeadSchema }]),
  ],
  controllers: [FeeHeadController],
  providers: [FeeHeadService],
})
export class FeeHeadModule {}
