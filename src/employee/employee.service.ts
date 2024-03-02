import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/dto/pagination.args';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { SortOrderInputEmployee } from './dto/getall-employee.args';
import { CreateEmployeeInput } from './dto/create-employee.args';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  /**
   * Get all employees (paginated, sorted)
   */
  async findAll(
    pag: PaginationInput,
    sort: SortOrderInputEmployee,
  ): Promise<Employee[]> {
    const { page, limit } = pag;
    const sortBy = Object.keys(sort)[0];

    return this.employeeModel
      .find()
      .sort({ [sortBy]: sort[sortBy] })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  /**
   * Get an employee by id
   */
  async findById(id: string): Promise<EmployeeDocument> {
    const employee = await this.employeeModel.findById(id).exec();

    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  /**
   * Validate if a / multiple employees exist
   */
  async validate(id: string | string[]): Promise<boolean> {
    const ids = Array.isArray(id) ? id : [id];

    if (ids?.length === 0) return true;

    for (let i = 0; i < ids.length; i++) {
      const employee = await this.employeeModel.findById(ids[i]).exec();
      if (!employee)
        throw new NotFoundException(`Employee Id at position ${i}, not found`);
    }
    return true;
  }

  /**
   * Get many employees by ids
   * @param ids - employee ids
   */
  async findMany(ids: string[]): Promise<Employee[]> {
    return this.employeeModel.find({ _id: { $in: ids } }).exec();
  }

  /**
   * Create an employee
   * @param employee - employee data
   * @todo - Validate if company exists, then add employee to it
   */
  async create(employee: CreateEmployeeInput): Promise<Employee> {
    const newEmployee = new this.employeeModel(employee);
    return newEmployee.save();
  }

  /**
   * Update an employee by id
   * @param id - employee id
   * @param employee - employee data
   */
  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    return this.employeeModel
      .findByIdAndUpdate(id, employee, {
        new: true,
      })
      .exec();
  }

  /**
   * Delete an employee by id
   * @param id - employee id
   * @todo - Validate if employee is in a company, then remove it
   */
  async remove(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
