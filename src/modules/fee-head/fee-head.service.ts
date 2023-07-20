import { Injectable } from '@nestjs/common';
import { CreateFeeHeadDto } from './dto/create-fee-head.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FeeHead, FeeHeadDocument } from 'src/schemas/Fee-head.schema';
import { Model } from 'mongoose';

@Injectable()
export class FeeHeadService {
  constructor(
    @InjectModel(FeeHead.name) private feeHeadModel: Model<FeeHeadDocument>
  ) {}

  async create(createFeeHeadDto: CreateFeeHeadDto): Promise<FeeHead> {
    const newFeeHead = new this.feeHeadModel(createFeeHeadDto);
    return newFeeHead.save();
  }

  async findAll(): Promise<FeeHead[]> {
    return this.feeHeadModel.find().exec();
  }
}