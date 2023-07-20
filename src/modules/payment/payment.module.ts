import { Module } from "@nestjs/common";
import { PaymentService } from "../../modules/payment/payment.service";
import { PaymentController } from "../../modules/payment/payment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "../../schemas/Payment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
