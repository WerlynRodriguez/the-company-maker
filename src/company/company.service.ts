import { Injectable, NotFoundException } from '@nestjs/common';
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
   * Get a company by id, used internally
   * @param id - company id
   */
  async findById(id: string): Promise<CompanyDocument> {
    const company = await this.companyModel.findById(id).exec();

    if (!company) throw new NotFoundException('Company not found');
    return company;
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
   * @param company - company data to update
   */
  async update(id: string, toUpdate: Partial<Company>): Promise<Company> {
    const company = await this.findById(id);

    company.set(toUpdate);
    return company.save();
  }

  /**
   * Delete a company by id
   * @param id - company id
   */
  async remove(id: string) {
    const company = await this.findById(id);
    return company.deleteOne();
  }

  /**
   * Add employees to a company
   * @param id - company id
   * @param employees - employees ids
   */
  async addEmployees(id: string, employees: string[]) {
    const company = await this.findById(id);

    company.employees = [...company.employees, ...employees];
    return company.save();
  }

  /**
   * Remove employees from a company
   * @param id - company id
   * @param employees - employees ids
   */
  async removeEmployees(id: string, employees: string[]) {
    const company = await this.findById(id);

    company.employees = company.employees.filter(
      (employee) => !employees.includes(employee),
    );
    return company.save();
  }
}
