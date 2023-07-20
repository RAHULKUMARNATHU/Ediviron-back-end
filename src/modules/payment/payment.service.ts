import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePaymentDto } from "../../modules/payment/dto/create-payment.dto";
import { Payment, PaymentDocument,  } from "../../schemas/Payment.schema";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { Installment, amountPaid, paymentDate, paymentMethod } =
      createPaymentDto;

    const createdPayment = new this.paymentModel({
      Installment,
      amountPaid,
      paymentDate,
      paymentMethod,
    });

    return createdPayment.save();
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentModel.find().populate("Installment").exec();
  }
}
