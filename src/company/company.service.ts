import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/dto/pagination.args';
import { Company, CompanyDocument } from 'src/schemas/company.schema';
import { SortOrderInputCompany } from './dto/getall-company.args';
import { CreateCompanyInput } from './dto/create-company.args';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  /**
   * Get all companies (with pagination and sorting)
   */
  async findAll(
    pag: PaginationInput,
    sort: SortOrderInputCompany,
  ): Promise<Company[]> {
    const { page, limit } = pag;
    const sortBy = Object.keys(sort)[0];

    return this.companyModel
      .find()
      .sort({ [sortBy]: sort[sortBy] })
      .skip((page - 1) * limit)
      .exec();
  }

  /**
   * Get a company by id
   * @param id - company id
   */
  async findOne(id: string): Promise<Company | null> {
    return this.companyModel.findById(id).exec();
  }

  /**
   * Create a company
   * @param name - company name
   */
  async create(company: CreateCompanyInput): Promise<Company> {
    const newCompany = new this.companyModel(company);
    return newCompany.save();
  }

  /**
   * Update a company by id
   * @param id - company id
   * @param company - company data
   */
  async update(id: string, company: Partial<Company>): Promise<Company> {
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

  /**
   * Add employees to a company
   * @param id - company id
   * @param employees - employees ids
   */
  async addEmployees(id: string, employees: string[]) {
    const company = await this.companyModel.findOne({ _id: id }).exec();

    if (!company) {
      return null;
    }

    company.employees = [...company.employees, ...employees];
    return company.save();
  }

  /**
   * Remove employees from a company
   * @param id - company id
   * @param employees - employees ids
   */
  async removeEmployees(id: string, employees: string[]) {
    const company = await this.companyModel.findOne({ _id: id }).exec();

    if (!company) {
      return null;
    }

    company.employees = company.employees.filter(
      (employee) => !employees.includes(employee),
    );
    return company.save();
  }
}
