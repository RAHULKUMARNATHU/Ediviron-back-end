import { Module } from "@nestjs/common";
import { InvoiceService } from "../../modules/invoice/invoice.service";
import { InvoiceController } from "../../modules/invoice/invoice.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceSchema } from "../../schemas/Invoice-schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
