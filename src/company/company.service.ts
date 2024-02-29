import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  /**
   * Get all companies
   */
  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  /**
   * Get a company by id
   * @param id - company id
   */
  async findOne(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  /**
   * Create a company
   * @param name - company name
   */
  async create(company: Company): Promise<Company> {
    const newCompany = new this.companyModel(company);
    return newCompany.save();
  }

  /**
   * Update a company by id
   * @param id - company id
   * @param company - company data
   */
  async update(id: string, company: Company): Promise<Company> {
    return this.companyModel
      .findByIdAndUpdate(id, company, {
        new: true,
      })
      .exec();
  }

  /**
   * Delete a company by id
   * @param id - company id
   */
  async remove(id: string) {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
