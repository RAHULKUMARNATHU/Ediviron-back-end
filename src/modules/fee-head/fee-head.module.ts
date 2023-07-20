import { Module } from "@nestjs/common";
import { FeeHeadService } from "../../modules/fee-head/fee-head.service";
import { FeeHeadController } from "../../modules/fee-head/fee-head.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { FeeHead, FeeHeadSchema } from "../../schemas/Fee-head.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FeeHead.name, schema: FeeHeadSchema }]),
  ],
  controllers: [FeeHeadController],
  providers: [FeeHeadService],
})
export class FeeHeadModule {}
