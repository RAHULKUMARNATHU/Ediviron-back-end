import { Module } from "@nestjs/common";
import { InstallmentService } from "../../modules/installment/installment.service";
import { InstallmentController } from "../../modules/installment/installment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Installment,
  InstallmentSchema,
} from "../../schemas/Installment.schema";
import { ScheduleModule } from "@nestjs/schedule";
import { Due, DueSchema } from "../../schemas/Due.schema";

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
