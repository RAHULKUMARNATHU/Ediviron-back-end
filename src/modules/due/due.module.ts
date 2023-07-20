import { Module } from "@nestjs/common";
import { DueService } from "./due.service";
import { DueController } from "./due.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Due, DueSchema } from "src/schemas/Due.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Due.name, schema: DueSchema }])],
  controllers: [DueController],
  providers: [DueService],
})
export class DueModule {}
