import { Module } from "@nestjs/common";
import { InstallmentService } from "./installment.service";
import { InstallmentController } from "./installment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Installment,
  InstallmentSchema,
} from "src/schemas/Installment.schema";
import { ScheduleModule } from "@nestjs/schedule";
import { Due, DueSchema } from "src/schemas/Due.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Installment.name, schema: InstallmentSchema },
      { name: Due.name, schema: DueSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [InstallmentController],
  providers: [InstallmentService],
})
export class InstallmentModule {}
